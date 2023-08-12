import "./App.css";
import Item from "./Item";
import React from "react";
function App() {
  const [item, setItem] = React.useState({
    count: 1,
    name: "",
    packed: false,
    id: crypto.randomUUID(),
  });
  const [items, setItems] = React.useState([]);
  function handleChange(event) {
    const { name, value } = event.target;

    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const [sort, setSort] = React.useState("input");

  function handleSort(e) {
    setSort(e.target.value);
  }

  let sortedItems;

  if (sort === "input") {
    sortedItems = items;
  } else if (sort === "status") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  } else if (sort === "description") {
    sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  function handleClick() {
    setItems((prev) => [...prev, item]);

    //如果不清理input的话，那么后续生产的item也会用和之前一样的id，所以删除功能就会失败

    setItem({ count: 1, name: "", packed: false, id: crypto.randomUUID() });
  }
  function handleCheck(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDelete(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function clearList() {
    setItems([]);
  }

  if (sort === "description") {
  }

  const itemElements = sortedItems.map((item) => (
    <Item
      packed={item.packed}
      count={item.count}
      name={item.name}
      key={item.id}
      handleDelete={() => handleDelete(item.id)}
      handleCheck={() => handleCheck(item.id)}
    />
  ));

  return (
    <div>
      <h1 className='text-center  text-bg-success p-2 '>Far Away Agent</h1>
      <div className='p-5'>
        <div className=''>
          <h3>What do you need for your trip</h3>
          <div className='d-flex gap-3'>
            <select name='count' onChange={handleChange} value={item.count}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
            <input
              className='form-input'
              type='text'
              placeholder='item...'
              onChange={handleChange}
              name='name'
              value={item.name}
            ></input>
            <button className='btn btn-success' onClick={handleClick}>
              Add
            </button>
          </div>
        </div>
        <div className='mt-3 mb-3'>{itemElements}</div>
        <div className='d-flex gap-2'>
          <select onChange={handleSort} value={sort}>
            <option value='input'>sort by input order</option>
            <option value='description'>sort by description</option>
            <option value='status'>sort by packed status</option>
          </select>
          <button className='btn btn-warning' onClick={clearList}>
            clear list
          </button>
        </div>
        <div className='h4 text-success mt-2'>
          You have {items.length} items on your list, and you already picked
          {items.filter((item) => item.packed).length}
        </div>
      </div>
    </div>
  );
}

export default App;
