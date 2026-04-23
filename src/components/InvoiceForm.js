import React, { useState } from "react";

const InvoiceForm = ({ onAdd, onClose, existingInvoice, invoices = [] }) => {
  const [clientName, setClientName] = useState(
    existingInvoice?.clientName || ""
  );
  const [email, setEmail] = useState(
    existingInvoice?.email || ""
  );
  const [total, setTotal] = useState(
    existingInvoice?.total || ""
  );

  const [error, setError] = useState("");

  const generateInvoiceId = (invoices) => {
    const existingIds = new Set(invoices.map((inv) => inv.id));

    let id;

    do {
      id = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
    } while (existingIds.has(id));

    return id;
  };

  const validate = () => {
    if (!clientName.trim()) return "Client name is required";
    if (!email.includes("@")) return "Enter a valid email";
    if (!total) return "Total is required";
    if (Number(total) <= 0) return "Total must be greater than 0";
    return "";
  };

  const handleSubmit = (status) => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    if (existingInvoice?.status === "Paid" && status !== "Paid") {
      setError("Paid invoices cannot be changed");
      return;
    }

    const newInvoice = {
      id: existingInvoice
        ? existingInvoice.id
        : generateInvoiceId(invoices),

      clientName,
      email,
      total: Number(total),
      status,
    };

    onAdd(newInvoice);

    setClientName("");
    setEmail("");
    setTotal("");
    setError("");

    onClose();
  };

  return (
    <section className="form-container" aria-labelledby="form-title">
      <h2 id="form-title">
        {existingInvoice ? "Edit Invoice" : "New Invoice"}
      </h2>

      {error && (
        <p className="error-text" role="alert">
          ⚠ {error}
        </p>
      )}

      <form onSubmit={(e) => e.preventDefault()}>

        <div className="form-group">
          <label htmlFor="clientName">Client Name</label>
          <input
            id="clientName"
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="total">Total</label>
          <input
            id="total"
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
          />
        </div>

        <div className="form-buttons">
          <button
            type="button"
            onClick={() => handleSubmit("Draft")}
          >
            Save as Draft
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("Pending")}
          >
            Save & Send
          </button>

          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default InvoiceForm;