import { useEffect, useState } from "react";

import "./style.css";

const HistoryTable = (props) => {
  const { transHistoryData, onDeleteFunc, onUpdateFunc } = props;
  // console.log('transHistoryData in history', transHistoryData)

  const [editingData, setEditingData] = useState(null);
  const [isSaved, setIsSaved] = useState(false)

  const handleEdit = (row) => {
    setEditingData({ ...row });
  };

  const handleChange = (e, field) => {
    setEditingData({ ...editingData, [field]: e.target.value });
  };

  const handleSave = async () => {
    // console.log("Saving changes:", editingData);
    try {
      await onUpdateFunc(editingData);
      setIsSaved(true)
    } catch(e){
      console.error("Update Failed...")
    }
  };

  const handleCancel = () => {
    setEditingData(null);
  };

  useEffect(()=>{
   if (isSaved && editingData) {
    // console.log('Done updation')
    setEditingData(null)
    setIsSaved(false)
   } 
  }, [isSaved, editingData])

  return (
    <div className="table-box">
      {(transHistoryData?.length ?? 0) === 0 ? (
        <div className="table-nodata-box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7466/7466073.png"
            loading="lazy"
            alt="no data"
            className="nodata-img"
          />
          <p className="nodata-para">No Data</p>
        </div>
      ) : (
        <table
          border="1"
          id="trans-history-table"
          className="trans-history-table"
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Payment Type</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transHistoryData.map((each) => {
              const titled = each.title
              const formattedTitle = titled
                .split(" ")
                .map(each => each[0].toUpperCase() + each.slice(1).toLowerCase())
                .join(" ");
              return (
              <tr key={each.id}>
                {/* Editable Title */}
                <td>
                  {editingData && editingData.id === each.id ? (
                    <input
                      type="text"
                      value={editingData.title}
                      onChange={(e) => handleChange(e, "title")}
                    />
                  ) : (
                    formattedTitle
                  )}
                </td>

                {/* Editable Category */}
                <td>
                  {editingData && editingData.id === each.id ? (
                    <input
                      type="text"
                      value={editingData.category}
                      onChange={(e) => handleChange(e, "category")}
                    />
                  ) : (
                    each.category
                  )}
                </td>

                {/* Editable Amount */}
                <td>
                  {editingData && editingData.id === each.id ? (
                    <input
                      type="number"
                      value={editingData.amount}
                      onChange={(e) => handleChange(e, "amount")}
                    />
                  ) : (
                    `Rs.${each.amount}/-`
                  )}
                </td>

                {/* Payment Type */}
                <td>
                  {editingData && editingData.id === each.id ? (
                    <input
                      type="text"
                      value={editingData["payment_method"]}
                      onChange={(e) => handleChange(e, "payment_method")}
                    />
                  ) : (
                    // each.["payment_method"]
                    each["payment_method"]
                  )}
                </td>

                {/* Editable Date */}
                <td>
                  {editingData && editingData.id === each.id ? (
                    <input
                      type="text"
                      value={editingData.date}
                      onChange={(e) => handleChange(e, "date")}
                    />
                  ) : (
                    each.date
                  )}
                </td>

                {/* Edit Actions */}
                <td>
                  {editingData && editingData.id === each.id ? (
                    <>
                      <button onClick={handleSave} className="save-btn">
                        Save
                      </button>
                      <button onClick={handleCancel} className="cancel-btn">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(each)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                  )}
                </td>

                {/* Delete row */}
                <td>
                  <button
                    type="button"
                    className="table-del-btn"
                    onClick={() => onDeleteFunc(each.id)}
                  >
                    <img
                      className="table-del-img"
                      width="48"
                      height="48"
                      loading="lazy"
                      src="https://img.icons8.com/color/48/trash--v1.png"
                      alt="trash--v1"
                    />
                  </button>
                </td>
              </tr>
)})}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryTable;
