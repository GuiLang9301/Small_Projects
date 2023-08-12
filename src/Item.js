export default function Item({ name, count, handleDelete, handleCheck }) {
  return (
    <div id='item-lists' className='d-flex align-items-center p-2 gap-2 border'>
      <input type='checkbox' onChange={handleCheck}></input>
      <div>
        {count} {name}
      </div>
      <button className='btn btn-danger' onClick={handleDelete}>
        delete
      </button>
    </div>
  );
}
