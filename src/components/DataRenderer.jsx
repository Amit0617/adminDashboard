import React, { useEffect, useRef } from "react";
import "../App.css";
import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";
import SvgSave from "./SaveIcon";

function DataRenderer({ data }) {
  console.log("inside renderer", data);
  const [currentData, setData] = React.useState();
  const [checkBoxes, setCheckBoxes] = React.useState(
    Array(currentData ? currentData.length : null).fill(false)
  );
  const [editMode, setEditMode] = React.useState(false);
  const [currentRow, setCurrentRow] = React.useState(null);
  const selectAllCheckBox = useRef();

  useEffect(() => {
    setData(data);
    setCheckBoxes(Array(data && data.length).fill(false));
    console.log(data.length)
  }, [data]);

  const toggleSelectAll = () => {
    setCheckBoxes(() => {
      const allChecked = selectAllCheckBox.current.checked;
      if (allChecked) {
        return Array(currentData.length).fill(true);
      } else {
        console.log(currentData.length)
        return Array(currentData.length).fill(false);
      }
    });
  };

  const toggleCheck = (i) => {
    setCheckBoxes((prevState) => {
      const newState = [...prevState];
      newState[i] = !newState[i];
      return newState;
    });
  };

  const handleDelete = (i) => {
    const newData = currentData.filter((item, index) => {
      return index !== i;
    });
    setData(newData);
  };

  const handleDeleteSelected = () => {
    const newData = currentData.filter((item, index) => {
      return !checkBoxes[index];
    });
    setData(newData);
  };

  const editValues = (i) => {
    setEditMode((editModeValue) => !editModeValue);
    if (editMode == false) {
      const newData = currentData.map((item, index) => {
        if (index === i) {
          item["name"] = (
            <input
              defaultValue={item["name"]}
              onChange={(e) =>
                setCurrentRow({
                  ...item,
                  name: e.target.value,
                })
              }
              type="text"
            />
          );
          item["email"] = (
            <input
              defaultValue={item["email"]}
              onChange={(e) =>
                setCurrentRow({
                  ...item,
                  email: e.target.value,
                })
              }
              type="text"
            />
          );
          item["role"] = (
            <input
              defaultValue={item["role"]}
              onChange={(e) =>
                setCurrentRow({
                  ...item,
                  role: e.target.value,
                })
              }
              type="text"
            />
          );
        }
        return item;
      });
      setData(newData);
    } else {
      const newData = currentData.map((item, index) => {
        if (index === i) {
          console.log(currentRow);
          Object.keys(item).map((key) => {
            item[key] = currentRow[key]?.props?.defaultValue
              ? currentRow[key]?.props.defaultValue
              : currentRow[key];
          });
        }
        return item;
      });
      setData(newData);
    }
  };

  return (
    <div className="container">
      <button onClick={() => handleDeleteSelected()} style={{ float: "right" }}>
        <DeleteIcon width="15" />
      </button>
      <table style={{ width: "75vw" }}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" ref={selectAllCheckBox} onChange={() => toggleSelectAll()} />
            </th>
            {currentData &&
              // Object.keys(currentData[0]).map((key, i) => {
              //   // do not render id
              //   if (key === "id") return null;
              //   return <th key={i}>{key}</th>;
              // })
              <>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </>
              }
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData &&
            currentData.map((item, i) => {
              return (
                // use pagination here to render only 10 items at a time
                <tr
                  key={i}
                  style={{ background: checkBoxes[i] ? "lightgray" : null }}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={checkBoxes[i]}
                      style={{ cursor: "pointer" }}
                      onChange={() => toggleCheck(i)}
                    />
                  </td>
                  {Object.keys(item).map((key, i) => {
                    // do not render id
                    if (key === "id") return null;
                    return <td key={i}>{item[key]}</td>;
                  })}
                  <td>
                    <button className="edit" onClick={() => editValues(i)}>
                      {editMode ? (
                        <SvgSave width="15" height="15" />
                      ) : (
                        <EditIcon width="15" />
                      )}
                    </button>
                    <button className="delete" onClick={() => handleDelete(i)}>
                      <DeleteIcon width="15" />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default DataRenderer;
