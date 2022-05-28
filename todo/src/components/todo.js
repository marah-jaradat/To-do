import React, { useEffect, useState, useContext } from "react";
import List from "./list";
import Form from "./form";
import Header from "./header";

import "./form.css";
import { v4 as uuid } from "uuid";
import { SettingsContext } from "../context/settings.js";
import ReactPaginate from "react-paginate";
import { Card, Elevation } from "@blueprintjs/core";

const ToDo = () => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [sort, setSort] = useState(false);
  const settings = useContext(SettingsContext);

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }
  const handleSort = () => {
    let items;
    if (settings.sortBy === "difficulty") {
      items = currentItems.sort((a, b) => {
        if (a.difficulty > b.difficulty) {
          return 1;
        } else if (a.difficulty < b.difficulty) {
          return -1;
        }
        return 0;
      });
    }

    console.log(items);
    setSort(!sort);
    setList(items);
  };

  useEffect(() => {
    const endOffset = itemOffset + settings.numberItems;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / settings.numberItems));
  }, [itemOffset, settings.numberItems, list]);

  useEffect(() => {
    setList(list);
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list, sort, incomplete]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * settings.numberItems) % list.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Header></Header>
      <header>
        <h3 id="h3"> no. of bending items: {incomplete} items </h3>
      </header>
      <div className="container">
        <Card elevation={Elevation.TWO} className="card-form">
          <Form addItem={addItem} handleSort={handleSort} />
        </Card>

        <div className="list-container">
          {currentItems.map((item) => (
            <List
              item={item}
              deleteItem={deleteItem}
              toggleComplete={toggleComplete}
            />
          ))}
        </div>
      </div>
      <div className="pag">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default ToDo;
