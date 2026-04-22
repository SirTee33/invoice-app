import React, { useState, useEffect } from "react";
import InvoiceForm from "../components/InvoiceForm";
import "../styles/InvoiceList.css";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem("invoices");
    return saved
      ? JSON.parse(saved)
      : [
        {
          id: "INV-001",
          clientName: "John Doe",
          total: 250,
          status: "Pending",
        },
      ];
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);

  const [filter, setFilter] = useState("All");

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowDeleteModal(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const addInvoice = (invoice) => {
    const exists = invoices.find((inv) => inv.id === invoice.id);

    if (exists) {
      const updated = invoices.map((inv) =>
        inv.id === invoice.id ? invoice : inv
      );
      setInvoices(updated);
    } else {
      setInvoices([invoice, ...invoices]);
    }
  };

  const deleteInvoice = () => {
    const filtered = invoices.filter(
      (inv) => inv.id !== invoiceToDelete.id
    );

    setInvoices(filtered);
    setShowDeleteModal(false);
    setInvoiceToDelete(null);
    setSelectedInvoice(null);
  };

  const markAsPaid = (id) => {
    const updated = invoices.map((inv) =>
      inv.id === id && inv.status === "Pending"
        ? { ...inv, status: "Paid" }
        : inv
    );

    setInvoices(updated);
  };

  const filteredInvoices = invoices.filter((inv) =>
    filter === "All"
      ? true
      : inv.status.toLowerCase() === filter.toLowerCase()
  );

  if (selectedInvoice && !showForm) {
    return (
      <main className="invoice-container detail-wrapper">
        <button className="back-btn" onClick={() => setSelectedInvoice(null)}>
          ← Back
        </button>

        <article className="detail-card">
          <header className="detail-header">
            <h2>{selectedInvoice.id}</h2>
            <span className={`status ${selectedInvoice.status.toLowerCase()}`}>
              {selectedInvoice.status}
            </span>
          </header>

          <section className="detail-body">
            <p><strong>Client:</strong> {selectedInvoice.clientName}</p>
            <p>
              <strong>Total:</strong>{" "}
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(selectedInvoice.total)}
            </p>
          </section>

          <div className="detail-actions">
            {selectedInvoice.status === "Pending" && (
              <button
                className="paid-btn"
                onClick={() => markAsPaid(selectedInvoice.id)}
              >
                ✔ Mark as Paid
              </button>
            )}

            <button className="edit-btn" onClick={() => setShowForm(true)}>
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => {
                setInvoiceToDelete(selectedInvoice);
                setShowDeleteModal(true);
              }}
            >
              Delete
            </button>
          </div>
        </article>
      </main>
    );
  }

  return (
    <main className="invoice-container">

      <header className="header">
        <div className="header-left">
          <h1>Invoices</h1>
          <p>{filteredInvoices.length} invoices</p>
        </div>

        <div className="header-right">
          <button
            className="theme-btn"
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <button
            className="new-btn"
            onClick={() => {
              setSelectedInvoice(null);
              setShowForm(true);
            }}
          >
            + New Invoice
          </button>
        </div>
      </header>

      <section className="filter-bar">
        {["All", "Draft", "Pending", "Paid"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </section>

      {showForm && (
        <InvoiceForm
          onAdd={addInvoice}
          onClose={() => {
            setShowForm(false);
            setSelectedInvoice(null);
          }}
          existingInvoice={selectedInvoice}
        />
      )}

      {filteredInvoices.length === 0 && (
        <p>No invoices match this filter.</p>
      )}

      <section className="invoice-list">
        {filteredInvoices.map((inv) => (
          <article
            key={inv.id}
            className="invoice-card"
            role="button"
            tabIndex="0"
            onClick={() => setSelectedInvoice(inv)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSelectedInvoice(inv);
              }
            }}
          >
            <h3>{inv.id}</h3>
            <p>{inv.clientName}</p>
            <p>
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(inv.total)}
            </p>

            <p className={`status ${inv.status.toLowerCase()}`}>
              {inv.status}
            </p>
          </article>
        ))}
      </section>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
          >
            <h3>Delete Invoice?</h3>
            <p>This action cannot be undone.</p>

            <button onClick={deleteInvoice}>Yes, Delete</button>
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setInvoiceToDelete(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default InvoiceList;