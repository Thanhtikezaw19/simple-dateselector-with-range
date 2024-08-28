<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dynamic Table</title>
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
    }
    th {
      background-color: #f2f2f2;
      text-align: left;
    }
    .hidden {
      display: none;
    }
  </style>
</head>
<body>
  <table id="dataTable">
    <thead>
      <tr>
        <th>CompanyName</th>
        <th>BuildingName</th>
        <th>StartDate</th>
        <th>EndDate</th>
        <th>Setting</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr data-company="ABC Corp">
        <td><input type="checkbox" class="company-checkbox"> ABC Corp</td>
        <td>Building 1</td>
        <td>2023-01-01</td>
        <td>2023-12-31</td>
        <td>Configuration 1</td>
        <td>1000</td>
      </tr>
      <tr data-company="ABC Corp">
        <td></td>
        <td>Building 2</td>
        <td>2023-02-01</td>
        <td>2023-11-30</td>
        <td>Configuration 2</td>
        <td>1200</td>
      </tr>
      <tr data-company="ABC Corp">
        <td></td>
        <td>Building 3</td>
        <td>2023-02-01</td>
        <td>2023-11-30</td>
        <td>Configuration 3</td>
        <td>1500</td>
      </tr>
      <tr data-company="XYZ Ltd">
        <td><input type="checkbox" class="company-checkbox"> XYZ Ltd</td>
        <td>Building 3</td>
        <td>2024-02-01</td>
        <td>2024-11-30</td>
        <td>Configuration 4</td>
        <td>2000</td>
      </tr>
      <tr data-company="XYZ Ltd">
        <td></td>
        <td>Building 4</td>
        <td>2024-03-01</td>
        <td>2024-10-30</td>
        <td>Configuration 5</td>
        <td>2500</td>
      </tr>
    </tbody>
  </table>

  <script>
    const companyCheckboxes = document.querySelectorAll('.company-checkbox');

    companyCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        const rows = document.querySelectorAll(`tbody tr[data-company="${this.parentElement.parentElement.dataset.company}"]`);
        
        if (this.checked) {
          let totalAmount = 0;
          let settings = [];
          let startDate = rows[0].cells[2].innerText;
          let endDate = rows[0].cells[3].innerText;

          rows.forEach((row, index) => {
            if (index > 0) row.classList.add('hidden'); // Hide all but the first row
            settings.push(row.cells[4].innerText);
            totalAmount += parseInt(row.cells[5].innerText);
          });

          const firstRow = rows[0];
          firstRow.cells[4].innerText = settings.join(', ');
          firstRow.cells[5].innerText = totalAmount;
          firstRow.cells[1].innerText = ""; // Clear the building name
          firstRow.cells[2].innerText = startDate;
          firstRow.cells[3].innerText = endDate;

        } else {
          rows.forEach(row => row.classList.remove('hidden')); // Show all rows
          rows[0].cells[4].innerText = 'Configuration 1';
          rows[0].cells[5].innerText = '1000';
          rows[0].cells[1].innerText = 'Building 1';
          rows[0].cells[2].innerText = '2023-01-01';
          rows[0].cells[3].innerText = '2023-12-31';
        }
      });
    });
  </script>
</body>
</html>
