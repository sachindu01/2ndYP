<input
  onChange={(e) =>
    e.target.value === "" || e.target.value === "0"
      ? null
      : updateQuantity(item._id, item.size, Number(e.target.value))
  }
  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 transform -translate-y-14"
  type="number"
  min={1}
  defaultValue={item.quantity}
/>;
