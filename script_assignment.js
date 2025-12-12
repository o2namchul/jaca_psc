/* script_assignment.js */

// Mock Data
const ASSIGNMENTS = [
    { id: 1, name: '김이젠', studId: '2024001', date: '2024.12.10', file: 'report_kim.hwp', fileType: 'word', plagiarism: 88, score: 0, status: 'waiting' },
    { id: 2, name: '홍길동', studId: '2024002', date: '2024.12.09', file: 'marketing_hong.pdf', fileType: 'pdf', plagiarism: 5, score: 95, status: 'done' },
    { id: 3, name: '박철수', studId: '2024003', date: '2024.12.11', file: 'analysis_park.docx', fileType: 'word', plagiarism: 15, score: null, status: 'waiting' },
    { id: 4, name: '이영희', studId: '2024004', date: '2024.12.08', file: 'lee_report_final.pdf', fileType: 'pdf', plagiarism: 8, score: 92, status: 'done' },
    { id: 5, name: '최민수', studId: '2024005', date: '2024.12.12', file: 'choi_final.docx', fileType: 'word', plagiarism: 25, score: null, status: 'waiting' }
];

let currentFilter = 'all'; // all, waiting, done

function initAssignment() {
    initLayout('assignment'); // Link global layout if needed
    renderTable();

    // Masking check on load
    const toggle = document.getElementById('privacyToggle');
    if (toggle) toggleMasking(toggle);
}

function setFilter(filter, el) {
    currentFilter = filter;

    // UI Update
    document.querySelectorAll('.prof-assign-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');

    renderTable();
}

function renderTable() {
    const tbody = document.getElementById('assignTableBody');
    tbody.innerHTML = '';

    const filtered = ASSIGNMENTS.filter(a => {
        if (currentFilter === 'all') return true;
        return a.status === currentFilter;
    });

    filtered.forEach((item, index) => {
        const tr = document.createElement('tr');

        // Plagiarism Logic
        let plagBadge = '';
        if (item.plagiarism >= 51) {
            plagBadge = `<span class="pa-badge badge-danger"><i class="fa-solid fa-triangle-exclamation"></i> ${item.plagiarism}%</span>`;
        } else if (item.plagiarism >= 21) {
            plagBadge = `<span class="pa-badge badge-warn">${item.plagiarism}%</span>`;
        } else {
            plagBadge = `<span class="pa-badge badge-safe">${item.plagiarism}%</span>`;
        }

        // Status Logic
        let statusBadge = '';
        if (item.status === 'done') {
            statusBadge = `<span class="pa-badge badge-status-done">채점완료</span>`;
        } else {
            statusBadge = `<span class="pa-badge badge-status-wait">채점대기</span>`;
        }

        // File Icon
        let fileIcon = item.fileType === 'word' ? '<i class="fa-solid fa-file-word"></i>' : '<i class="fa-solid fa-file-pdf"></i>';

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td class="td-left">
                <span class="privacy-name" data-original="${item.name}">${item.name}</span>
                <br>
                <span style="font-size:0.8rem; color:#888;" class="privacy-id" data-original="${item.studId}">${item.studId}</span>
            </td>
            <td>${item.date}</td>
            <td class="td-left">
                <a href="#" class="td-file">${fileIcon} ${item.file}</a>
            </td>
            <td>${plagBadge}</td>
            <td>
                <input type="number" class="pa-score-input" value="${item.score || ''}" placeholder="-" min="0" max="100">
            </td>
            <td>
                <button class="pa-btn-comment" onclick="alert('${item.name} 학생 피드백 입력창')"><i class="fa-regular fa-comment-dots"></i></button>
            </td>
            <td>${statusBadge}</td>
        `;

        tbody.appendChild(tr);
    });

    // Re-apply masking
    const toggle = document.getElementById('privacyToggle');
    if (toggle && toggle.checked) toggleMasking(toggle);
}

function requestPlagCheck() {
    alert('모사율 재검사 요청을 전송했습니다.\n결과는 약 10분 후 반영됩니다.');
}

function saveAllScores() {
    // In real app, gather all inputs
    const inputs = document.querySelectorAll('.pa-score-input');
    let count = 0;
    inputs.forEach(inp => {
        if (inp.value !== '') count++;
    });

    alert(`총 ${count}건의 점수가 저장되었습니다.`);
}

// Wait for DOM
window.addEventListener('DOMContentLoaded', initAssignment);
