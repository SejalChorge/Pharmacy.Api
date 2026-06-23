import { useEffect, useState } from "react";
import {
  getMedicines,
  addMedicine,
  sellMedicine,
} from "./services/medicineService";
import "./App.css";

function App() {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    notes: "",
    expiryDate: "",
    quantity: 0,
    price: 0,
    brand: "",
  });

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    const data = await getMedicines();
    setMedicines(data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addMedicine(formData);

    loadMedicines();

    setFormData({
      fullName: "",
      notes: "",
      expiryDate: "",
      quantity: 0,
      price: 0,
      brand: "",
    });
  };

  const filteredMedicines = medicines.filter((m) =>
    (m.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getRowClass = (medicine) => {
    const expiryDate = new Date(medicine.expiryDate);
    const today = new Date();

    const daysRemaining = (expiryDate - today) / (1000 * 60 * 60 * 24);

    if (daysRemaining < 30) {
      return "table-danger";
    }

    if (medicine.quantity < 10) {
      return "table-warning";
    }

    return "";
  };

  const handleSale = async (medicineId) => {
    await sellMedicine(medicineId);

    loadMedicines();
  };

  return (
    <div className="container-fluid p-4">
      <h2 className="text-muted text-center">
        💊 Pharmacy Inventory Management System
      </h2>

      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header">Add Medicine</div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <label className="form-label">Medicine Name</label>
                <input
                  name="fullName"
                  placeholder="Medicine Name"
                  className="form-control mb-2"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <label className="form-label">Notes</label>
                <textarea
                  name="notes"
                  placeholder="Notes"
                  className="form-control mb-2"
                  value={formData.notes}
                  onChange={handleChange}
                />

                <label className="form-label">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  className="form-control mb-2"
                  value={formData.expiryDate}
                  onChange={handleChange}
                />

                <label className="form-label"> Quantity in Stock</label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  className="form-control mb-2"
                  value={formData.quantity}
                  onChange={handleChange}
                />

                <label className="form-label">Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  placeholder="Price"
                  className="form-control mb-2"
                  value={formData.price}
                  onChange={handleChange}
                />

                <label className="form-label">Brand</label>
                <input
                  name="brand"
                  placeholder="Brand"
                  className="form-control mb-2"
                  value={formData.brand}
                  onChange={handleChange}
                />

                <button className="btn btn-primary">Add Medicine</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="mb-3 mt-3">
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search medicine..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-header">Available Medicines</div>

            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <div className="d-flex gap-2 mb-3">
                  <span className="badge bg-primary">
                    Total: {filteredMedicines.length}
                  </span>

                  <span className="badge bg-warning text-dark">
                    Low Stock:{" "}
                    {filteredMedicines.filter((x) => x.quantity < 10).length}
                  </span>
                </div>
              </div>
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Expiry</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Brand</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMedicines.map((medicine) => (
                    <tr key={medicine.id} className={getRowClass(medicine)}>
                      <td>{medicine.fullName}</td>
                      <td>
                        {new Date(medicine.expiryDate).toLocaleDateString()}
                      </td>
                      <td>{medicine.quantity}</td>
                      <td>{medicine.price}</td>
                      <td>{medicine.brand}</td>
                      <td>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleSale(medicine.id)}
                        >
                          Sell 1
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
