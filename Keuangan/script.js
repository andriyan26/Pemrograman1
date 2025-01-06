const transaksi = [];
let totalPemasukan = 0;
let totalPengeluaran = 0;

document.getElementById("transaksiForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const deskripsi = document.getElementById("deskripsi").value;
    const jumlah = parseFloat(document.getElementById("jumlah").value);
    const kategori = document.getElementById("kategori").value;
    const kategoriPengeluaran = document.getElementById("kategoriPengeluaran").value;

    if (kategori === "pemasukan") {
        totalPemasukan += jumlah;
    } else {
        totalPengeluaran += jumlah;
    }

    const tanggal = new Date().toLocaleDateString();
    transaksi.push({ deskripsi, jumlah, kategori, kategoriPengeluaran, tanggal });
    updateSummary();
    updateChart();
    this.reset();
});

function updateSummary() {
    document.getElementById("totalPemasukan").innerText = `Rp ${totalPemasukan}`;
    document.getElementById("totalPengeluaran").innerText = `Rp ${totalPengeluaran}`;
    document.getElementById("sisaSaldo").innerText = `Rp ${totalPemasukan - totalPengeluaran}`;
}

const ctx = document.getElementById("saldoChart").getContext("2d");
let saldoChart;

function updateChart() {
    const labels = transaksi.map(t => t.tanggal);
    const data = transaksi.map(t => t.kategori === "pemasukan" ? t.jumlah : -t.jumlah);
    const saldoData = [];

    for (let i = 0; i < data.length; i++) {
        saldoData.push((saldoData[i - 1] || 0) + data[i]);
    }

    if (saldoChart) {
        saldoChart.destroy();
    }

    saldoChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Saldo Harian",
                data: saldoData,
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function exportToCSV() {
    const csvContent = "data:text/csv;charset=utf-8,"
        + transaksi.map(e => `${e.tanggal},${e.deskripsi},${e.jumlah},${e.kategori},${e.kategoriPengeluaran}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const a = document.createElement("a");
    a.setAttribute("href", encodedUri);
    a.setAttribute("download", "transaksi.csv");
    document.body.appendChild(a);
    a.click();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
