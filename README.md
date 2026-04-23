# Invoice Management App

A fully functional, responsive Invoice Management Application built with **React**.  
This app allows users to create, manage, and track invoices with modern UI and state persistence.

## Live Demo

[Live App URL](https://invoice-app-sirtee.vercel.app/)

## GitHub Repository

https://github.com/SirTee33/invoice-app

## Features

### Core Functionality

- Create invoices
- View invoice list
- View invoice details
- Edit existing invoices
- Delete invoices (with confirmation modal)

### Status Management

- Save invoices as **Draft**
- Save invoices as **Pending**
- Mark invoices as **Paid**
- Prevent invalid status changes (e.g., Paid → Draft)

### Filtering

- Filter invoices by:
  - All
  - Draft
  - Pending
  - Paid
- Instant UI updates
- Empty state when no results match

### Form Validation

- Required fields enforced:
  - Client name
  - Email
  - Total
- Email format validation
- Prevent submission if invalid
- Visual error feedback

### UI / UX

- Clean SaaS-style design
- Hover states for all interactive elements
- Smooth transitions and feedback
- Responsive layout (mobile, tablet, desktop)

### Theme Toggle

- Light / Dark mode
- Persistent theme using LocalStorage

### Data Persistence

- All invoices stored in **LocalStorage**
- Data remains after refresh

## Tech Stack

- React (Functional Components + Hooks)
- CSS (Custom styling, Flexbox)
- LocalStorage API

## Architecture

The app is structured into reusable components:

- `InvoiceList` → Main page (list, filter, theme)
- `InvoiceForm` → Create / Edit form
- Detail View → Displays selected invoice
- Modal → Delete confirmation

State is managed using React hooks:

- `useState`
- `useEffect`

## Accessibility

- Semantic HTML elements used
- Buttons use `<button>` (not divs)
- Form inputs have labels
- Modal:
  - Can be closed with **ESC key**
  - Keyboard accessible
- Good color contrast for both light and dark modes

## Responsiveness

- Mobile-first design
- Breakpoints:
  - 320px+
  - 768px+
  - 1024px+
- Layout adapts without overflow
- Cards and forms scale properly across devices

## Trade-offs

- Used LocalStorage instead of backend for simplicity
- Invoice items kept minimal (no advanced calculations)
- No authentication system included

## Known Limitations

- No backend/database (data is local only)
- No user authentication
- Invoice IDs are randomly generated (not sequential)
- Limited invoice item structure

## Setup Instructions

1. Clone the repo:

```bash
git clone https://github.com/SirTee33/invoice-app.git
```
