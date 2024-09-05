<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Company and Building Accordion</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 8px 12px;
            border: 1px solid #ccc;
            text-align: left;
        }

        .accordion-icon {
            cursor: pointer;
        }

        .company-row, .building-row {
            background-color: #f1f1f1;
        }

        .hidden-row {
            display: none;
        }

        .accordion-icon::before {
            content: '+';
            font-size: 14px;
            margin-right: 8px;
        }

        .expanded .accordion-icon::before {
            content: '-';
        }

        .hidden-amount-setting {
            visibility: hidden;
        }
    </style>
</head>

<body>

<div class="container mt-4">
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Company Name</th>
                <th>Building Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Setting</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody id="tableBody">
            <!-- Dynamic Rows Will Be Injected Here -->
        </tbody>
    </table>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const data = [
            {
                companyName: 'ABC Corp',
                buildings: [
                    {
                        buildingName: 'Building 1',
                        details: [
                            { startDate: '2023-01-01', endDate: '2023-12-31', setting: 'Configuration 1', amount: 1000 },
                            { startDate: '2023-02-01', endDate: '2023-11-30', setting: 'Configuration 2', amount: 1200 }
                        ]
                    },
                    {
                        buildingName: 'Building 2',
                        details: [
                            { startDate: '2023-02-01', endDate: '2023-11-30', setting: 'Configuration 3', amount: 1500 }
                        ]
                    }
                ]
            },
            {
                companyName: 'XYZ Ltd',
                buildings: [
                    {
                        buildingName: 'Building 3',
                        details: [
                            { startDate: '2024-02-01', endDate: '2024-11-30', setting: 'Configuration 4', amount: 2000 },
                            { startDate: '2024-03-01', endDate: '2024-10-30', setting: 'Configuration 5', amount: 2500 }
                        ]
                    }
                ]
            }
        ];

        const tableBody = document.querySelector('#tableBody');

        // Generate the table rows from the data
        data.forEach((company, companyIndex) => {
            let totalAmountForCompany = 0;
            let combinedSettingsForCompany = '';

            company.buildings.forEach(building => {
                building.details.forEach(detail => {
                    totalAmountForCompany += detail.amount;
                    combinedSettingsForCompany += detail.setting + ', ';
                });
            });

            combinedSettingsForCompany = combinedSettingsForCompany.slice(0, -2); // Remove trailing comma

            company.buildings.forEach((building, buildingIndex) => {
                let firstBuildingRow = true;

                building.details.forEach((detail, detailIndex) => {
                    const row = document.createElement('tr');
                    row.classList.add(`company-${companyIndex}`, `building-${buildingIndex}`);

                    let companyNameCell = '';
                    let buildingNameCell = '';

                    // Empty companyName for the second and subsequent rows in the company group
                    if (detailIndex === 0 && firstBuildingRow) {
                        companyNameCell = `<td class="company-name-cell"><span class="accordion-icon" data-company-index="${companyIndex}"></span> ${company.companyName}</td>`;
                    } else {
                        companyNameCell = `<td></td>`;
                    }

                    // Empty buildingName for the second and subsequent rows in the building group
                    if (detailIndex === 0) {
                        buildingNameCell = `<td><span class="accordion-icon" data-building-index="${buildingIndex}" data-company-index="${companyIndex}"></span> ${building.buildingName}</td>`;
                        firstBuildingRow = false;
                    } else {
                        buildingNameCell = `<td></td>`;
                    }

                    row.innerHTML = `
                        ${companyNameCell}
                        ${buildingNameCell}
                        <td>${detail.startDate}</td>
                        <td>${detail.endDate}</td>
                        <td>${detail.setting}</td>
                        <td>${detail.amount}</td>
                    `;

                    tableBody.appendChild(row);
                });
            });
        });

        // Accordion toggle function
        document.querySelectorAll('.accordion-icon').forEach(icon => {
            icon.addEventListener('click', function () {
                const companyIndex = this.getAttribute('data-company-index');
                const buildingIndex = this.getAttribute('data-building-index');

                if (companyIndex !== null && buildingIndex === null) {
                    // Toggle visibility of all rows under this company
                    const rowsToToggle = document.querySelectorAll(`.company-${companyIndex}`);
                    const firstRow = rowsToToggle[0]; // First row of the company group

                    if (firstRow.classList.contains('expanded')) {
                        // Revert to normal (show all rows)
                        rowsToToggle.forEach(row => {
                            const cells = row.querySelectorAll('td');
                            if (cells[2].getAttribute('data-original-value')) {
                                // Restore original StartDate and EndDate
                                cells[2].textContent = cells[2].getAttribute('data-original-value');
                                cells[3].textContent = cells[3].getAttribute('data-original-value');
                            }
                            row.classList.remove('hidden-row');
                        });

                        // Hide combined setting and amount
                        firstRow.querySelector('td:nth-child(5)').textContent = '';
                        firstRow.querySelector('td:nth-child(6)').textContent = '';
                        firstRow.classList.remove('expanded');
                    } else {
                        // Hide detail rows and update first row with combined setting and amount
                        let combinedSettings = '';
                        let totalAmount = 0;

                        rowsToToggle.forEach((row, index) => {
                            const cells = row.querySelectorAll('td');
                            if (index > 0) {
                                // Hide rows except the first one
                                row.classList.add('hidden-row');
                            } else {
                                // Empty out StartDate and EndDate for the first row (but store original)
                                if (!cells[2].getAttribute('data-original-value')) {
                                    cells[2].setAttribute('data-original-value', cells[2].textContent);
                                    cells[3].setAttribute('data-original-value', cells[3].textContent);
                                }
                                cells[2].textContent = '';
                                cells[3].textContent = '';
                            }

                            // Accumulate settings and amounts
                            combinedSettings += cells[4].textContent + ', ';
                            totalAmount += parseInt(cells[5].textContent);
                        });

                        combinedSettings = combinedSettings.slice(0, -2); // Remove trailing comma

                        // Show combined setting and amount in the first row
                        firstRow.querySelector('td:nth-child(5)').textContent = combinedSettings;
                        firstRow.querySelector('td:nth-child(6)').textContent = totalAmount;

                        firstRow.classList.add('expanded');
                    }

                } else if (buildingIndex !== null) {
                    // Toggle visibility of all rows under this building
                    const rowsToToggle = document.querySelectorAll(`.company-${companyIndex}.building-${buildingIndex}`);
                    const firstRow = rowsToToggle[0]; // First row of the building group

                    if (firstRow.classList.contains('expanded')) {
                        // Revert to normal (show all rows)
                        rowsToToggle.forEach(row => {
                            const cells = row.querySelectorAll('td');
                            if (cells[2].getAttribute('data-original-value')) {
                                // Restore original StartDate and EndDate
                                cells[2].textContent = cells[2].getAttribute('data-original-value');
                                cells[3].textContent = cells[3].getAttribute('data-original-value');
                            }
                            row.classList.remove('hidden-row');
                        });

                        // Hide combined setting and amount
                        firstRow.querySelector('td:nth-child(5)').textContent = '';
                        firstRow.querySelector('td:nth-child(6)').textContent = '';
                        firstRow.classList.remove('expanded');
                    } else {
                        // Hide detail rows and update first row with combined setting and amount
                        let combinedSettings = '';
                        let totalAmount = 0;

                        rowsToToggle.forEach((row, index) => {
                            const cells = row.querySelectorAll('td');
                            if (index > 0) {
                                // Hide rows except the first one
                                row.classList.add('hidden-row');
                            } else {
                                // Empty out StartDate and EndDate for the first row (but store original)
                                if (!cells[2].getAttribute('data-original-value')) {
                                    cells[2].setAttribute('data-original-value', cells[2].textContent);
                                    cells[3].setAttribute('data-original-value', cells[3].textContent);
                                }
                                cells[2].textContent = '';
                                cells[3].textContent = '';
                            }

                            // Accumulate settings and amounts
                            combinedSettings += cells[4].textContent + ', ';
                            totalAmount += parseInt(cells[5].textContent);
                        });

                        combinedSettings = combinedSettings.slice(0, -2); // Remove trailing comma

                        // Show combined setting and amount in the first row
                        firstRow.querySelector('td:nth-child(5)').textContent = combinedSettings;
                        firstRow.querySelector('td:nth-child(6)').textContent = totalAmount;

                        firstRow.classList.add('expanded');
                    }
                }

                // Toggle accordion icon state
                this.classList.toggle('expanded');
            });
        });
    });
</script>



</body>

</html>

