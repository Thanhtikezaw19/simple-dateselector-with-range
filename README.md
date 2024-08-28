<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Company and Building Toggle</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 8px 12px;
            border: 1px solid #ccc;
            text-align: left;
        }

        .hidden-cell {
            display: none;
        }

        .company-name-cell {
            vertical-align: top;
            background-color: #f9f9f9;
            font-weight: bold;
        }

        .toggle-btn {
            margin-right: 8px;
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
            <!-- Dynamic Rows Will Be Injected Here -->
        </tbody>
    </table>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const data = [
                {
                    companyName: 'ABC Corp',
                    buildings: [
                        {
                            buildingName: 'Building 1',
                            details: [
                                {
                                    startDate: '2023-01-01',
                                    endDate: '2023-12-31',
                                    setting: 'Configuration 1',
                                    amount: 1000
                                },
                                {
                                    startDate: '2023-02-01',
                                    endDate: '2023-11-30',
                                    setting: 'Configuration 2',
                                    amount: 1200
                                }
                            ]
                        },
                        {
                            buildingName: 'Building 2',
                            details: [
                                {
                                    startDate: '2023-02-01',
                                    endDate: '2023-11-30',
                                    setting: 'Configuration 3',
                                    amount: 1500
                                }
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
                                {
                                    startDate: '2024-02-01',
                                    endDate: '2024-11-30',
                                    setting: 'Configuration 4',
                                    amount: 2000
                                },
                                {
                                    startDate: '2024-03-01',
                                    endDate: '2024-10-30',
                                    setting: 'Configuration 5',
                                    amount: 2500
                                }
                            ]
                        }
                    ]
                }
            ];

            const tableBody = document.querySelector('#dataTable tbody');
            data.forEach(company => {
                const { companyName, buildings } = company;
                buildings.forEach((building, buildingIndex) => {
                    building.details.forEach((detail, detailIndex) => {
                        const row = document.createElement('tr');
                        row.classList.add('building-row');
                        row.dataset.companyName = companyName;
                        row.dataset.buildingName = building.buildingName;

                        if (buildingIndex === 0 && detailIndex === 0) {
                            const companyCell = document.createElement('td');
                            companyCell.classList.add('company-name-cell');
                            companyCell.rowSpan = buildings.reduce((acc, b) => acc + b.details.length, 0);
                            companyCell.innerHTML = `
                                <input type="checkbox" class="toggle-btn company-toggle-btn" data-company-name="${companyName}">
                                ${companyName}
                            `;
                            row.appendChild(companyCell);
                        }

                        if (detailIndex === 0) {
                            const buildingCell = document.createElement('td');
                            buildingCell.classList.add('building-name-cell');
                            buildingCell.rowSpan = building.details.length;
                            buildingCell.innerHTML = `
                                <input type="checkbox" class="toggle-btn building-toggle-btn">
                                ${building.buildingName}
                            `;
                            row.appendChild(buildingCell);
                        }

                        const startDateCell = document.createElement('td');
                        startDateCell.classList.add('start-date-cell');
                        startDateCell.textContent = detail.startDate;
                        row.appendChild(startDateCell);

                        const endDateCell = document.createElement('td');
                        endDateCell.classList.add('end-date-cell');
                        endDateCell.textContent = detail.endDate;
                        row.appendChild(endDateCell);

                        const settingCell = document.createElement('td');
                        settingCell.classList.add('setting-cell');
                        settingCell.textContent = detail.setting;
                        settingCell.dataset.originalSetting = detail.setting;
                        row.appendChild(settingCell);

                        const amountCell = document.createElement('td');
                        amountCell.classList.add('amount-cell');
                        amountCell.textContent = detail.amount;
                        amountCell.dataset.originalAmount = detail.amount;
                        row.appendChild(amountCell);

                        tableBody.appendChild(row);
                    });
                });
            });

            // Event Listener for Company Toggle Buttons
            document.querySelectorAll('.company-toggle-btn').forEach(button => {
                button.addEventListener('change', function () {
                    const companyName = this.dataset.companyName;
                    const isChecked = this.checked;
                    const rows = document.querySelectorAll(`tr[data-company-name="${companyName}"]`);
                    let totalAmount = 0;
                    let combinedSettings = [];


                    rows.forEach((row, index) => {
                        // let previousBuildingName = '';
                        let buildingCell = row.querySelector('.building-name-cell');
                        let startDateCell = row.querySelector('.start-date-cell');
                        let endDateCell = row.querySelector('.end-date-cell');
                        let settingCell = row.querySelector('.setting-cell');
                        let amountCell = row.querySelector('.amount-cell');
                        // const buildingName = buildingCell ? buildingCell.textContent.trim() : previousBuildingName;
                        // previousBuildingName = buildingName;
                        // const buildingRows = document.querySelectorAll(`tr[data-building-name="${previousBuildingName}"]`);
                        if (isChecked) {
                            if (index === 0) {
                                // buildingCell.rowSpan = 1;
                                buildingCell.style.visibility = 'hidden';
                                startDateCell.style.visibility = 'hidden';
                                endDateCell.style.visibility = 'hidden';
                            } else {
                                row.style.display = 'none';
                            }
                            combinedSettings.push(settingCell.dataset.originalSetting);
                            totalAmount += parseFloat(amountCell.dataset.originalAmount);
                            // Ensure that CompanyName for other companies remains visible
                            document.querySelectorAll('.company-name-cell').forEach(companyCell => {
                                if (companyCell.rowSpan > 1 && rows.length === companyCell.rowSpan) {
                                    companyCell.rowSpan = 1;
                                }
                            });
                        } else {
                            // buildingCell.rowSpan = buildingRows.length;
                            if (index === 0) {
                                const companyCell = row.querySelector('.company-name-cell');
                                companyCell.rowSpan = rows.length;
                            }

                            if (index === 0 && buildingCell) {
                                buildingCell.style.visibility = 'visible';
                                startDateCell.style.visibility = 'visible';
                                endDateCell.style.visibility = 'visible';
                            }
                            settingCell.textContent = settingCell.dataset.originalSetting;
                            amountCell.textContent = amountCell.dataset.originalAmount;
                            row.style.display = '';
                        }
                    });

                    if (isChecked && rows.length > 0) {
                        const row = rows[0];
                        const firstSettingCell = row.querySelector('td:nth-child(5)');
                        const firstAmountCell = row.querySelector('td:nth-child(6)');

                        firstSettingCell.textContent = combinedSettings.join(', ');
                        firstAmountCell.textContent = totalAmount;
                    }
                });
            });

            // Event Listener for Building Toggle Buttons
            document.querySelectorAll('.building-toggle-btn').forEach(button => {
                button.addEventListener('change', function () {
                    const row = this.closest('tr');
                    const buildingName = row.querySelector('.building-name-cell').textContent.trim();
                    const buildingRows = document.querySelectorAll(`tr[data-building-name="${buildingName}"]`);
                    let combinedSettings = [];
                    let totalAmount = 0;

                    buildingRows.forEach((r, index) => {
                        const startDateCell = r.querySelector('.start-date-cell');
                        const endDateCell = r.querySelector('.end-date-cell');
                        const settingCell = r.querySelector('.setting-cell');
                        const amountCell = r.querySelector('.amount-cell');

                        if (this.checked) {
                            if (index === 0) {
                                startDateCell.style.visibility = 'hidden';
                                endDateCell.style.visibility = 'hidden';
                            } else {
                                r.style.display = 'none';
                            }

                            combinedSettings.push(settingCell.dataset.originalSetting);
                            totalAmount += parseFloat(amountCell.dataset.originalAmount);
                        } else {
                            if (index === 0) {
                                startDateCell.style.visibility = 'visible';
                                endDateCell.style.visibility = 'visible';
                            }
                            r.style.display = '';
                            settingCell.textContent = settingCell.dataset.originalSetting;
                            amountCell.textContent = amountCell.dataset.originalAmount;
                        }
                    });

                    if (this.checked && buildingRows.length > 0) {
                        const firstRow = buildingRows[0];
                        const firstSettingCell = firstRow.querySelector('td:nth-child(5)');
                        const firstAmountCell = firstRow.querySelector('td:nth-child(6)');

                        firstSettingCell.textContent = combinedSettings.join(', ');
                        firstAmountCell.textContent = totalAmount;
                    }

                    // Ensure other buildings' rows are not affected
                    document.querySelectorAll('tr').forEach(r => {
                        if (!r.dataset.buildingName || r.dataset.buildingName !== buildingName) {
                            r.style.display = '';
                        }
                    });
                });
            });
        });
    </script>
</body>

</html>
