const subjects = [
    {
        name: "Pengolahan Citra Digital",
        sks: 2,
        schedule: "Senin, 08.50-10.30",
        lecturer: "Devi Damayanti, S.Kom., M.Kom."
    },
    {
        name: "Pemrograman Web 1",
        sks: 3,
        schedule: "Senin, 10.30-12.10",
        lecturer: "Fajar Agung Nugroho, S.Kom., M.Kom."
    },
    {
        name: "Sistem Informasi Manajemen",
        sks: 2,
        schedule: "Senin, 13.00-14.40",
        lecturer: "Khoirunnisya, S.Kom., M.Kom."
    },
    {
        name: "Teknik Riset Operasional",
        sks: 2,
        schedule: "Selasa, 08.50-10.30",
        lecturer: "Farizi Ilham, S.Kom., M.Kom."
    },
    {
        name: "Digital Entrepreneurship",
        sks: 2,
        schedule: "Rabu, 08.50-10.30",
        lecturer: "Hadi Zakaria, S.Kom., M.M., M.Kom."
    },
    {
        name: "Machine Learning",
        sks: 3,
        schedule: "Rabu, 13.00-14.40",
        lecturer: "Perani Rosyani, S.Kom., M.kom."
    },
    {
        name: "Metode Penelitian",
        sks: 3,
        schedule: "Jum'at, 07.10-08.50",
        lecturer: "Wasis Haryono, S.Kom., M.Kom."
    },
    {
        name: "Kecerdasan Buatan",
        sks: 3,
        schedule: "Jum'at, 08.50-10.30",
        lecturer: "Farizi Ilham, S.Kom., M.Kom."
    }
];

function displaySubjects() {
    const subjectList = document.getElementById("subjectList");
    subjectList.innerHTML = ""; // Clear previous list

    subjects.forEach((subject) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${subject.name}</strong><br>
            Total SKS: ${subject.sks} SKS<br>
            Hari/Jam Kuliah: ${subject.schedule}<br>
            Nama Dosen: ${subject.lecturer}
        `;
        subjectList.appendChild(listItem);
    });
}

function createChart() {
    const ctx = document.getElementById('subjectChart').getContext('2d');
    const days = ['Senin', 'Selasa', 'Rabu', 'Jum\'at'];
    const counts = [0, 0, 0, 0];

    subjects.forEach(subject => {
        const day = subject.schedule.split(",")[0];
        if (day === 'Senin') counts[0]++;
        else if (day === 'Selasa') counts[1]++;
        else if (day === 'Rabu') counts[2]++;
        else if (day === 'Jum\'at') counts[3]++;
    });

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: days,
            datasets: [{
                label: 'Jumlah Mata Kuliah per Hari',
                data: counts,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            }
        }
    });
}

// Call functions to display subjects and create chart
displaySubjects();
createChart();
