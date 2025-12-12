/* script_exam.js */

const EXAMS = [
    {
        id: 'ex01',
        title: '중간고사 (Midterm)',
        subject: '마케팅원론',
        period: '2024.10.20 ~ 2024.10.22',
        status: 'grading_needed',
        participants: { current: 49, total: 50 },
        grading: { current: 2, total: 49 } // Graded 2 out of 49 submitted
    },
    {
        id: 'ex02',
        title: '퀴즈 1차 (Quiz #1)',
        subject: '소비자행동론',
        period: '2024.12.11 ~ 2024.12.13',
        status: 'running',
        participants: { current: 18, total: 40 },
        grading: null // No grading yet
    },
    {
        id: 'ex03',
        title: '쪽지시험 (Pop Quiz)',
        subject: '마케팅원론',
        period: '2024.09.15 ~ 2024.09.16',
        status: 'done',
        participants: { current: 50, total: 50 },
        grading: { current: 50, total: 50 }
    },
    {
        id: 'ex04',
        title: '기말고사 (Final)',
        subject: '마케팅원론',
        period: '2024.12.20 ~ 2024.12.22',
        status: 'scheduled',
        participants: { current: 0, total: 50 },
        grading: null
    }
];

function initExamDashboard() {
    initLayout('exam_dashboard');
    renderGrid();
    updateSummary();
}

function renderGrid() {
    const grid = document.getElementById('examGrid');
    grid.innerHTML = '';

    EXAMS.forEach(exam => {
        const card = document.createElement('div');
        card.className = `prof-exam-card ${exam.status === 'grading_needed' ? 'urgent' : ''}`;

        // 1. Header
        let statusBadge = '';
        switch (exam.status) {
            case 'running': statusBadge = '<span class="pec-badge-status status-blue">● 진행중</span>'; break;
            case 'grading_needed': statusBadge = '<span class="pec-badge-status status-red">● 채점대기</span>'; break;
            case 'done': statusBadge = '<span class="pec-badge-status status-green">● 채점완료</span>'; break;
            default: statusBadge = '<span class="pec-badge-status status-gray">예정</span>';
        }

        // 2. Body Content
        // Participation Bar
        const partPct = Math.round((exam.participants.current / exam.participants.total) * 100);
        const partBar = `
            <div class="pec-progress-group">
                <div class="pec-progress-label">
                    <span>응시율</span>
                    <strong>${partPct}% (${exam.participants.current}/${exam.participants.total})</strong>
                </div>
                <div class="pec-progress-track">
                    <div class="pec-progress-fill fill-blue" style="width: ${partPct}%"></div>
                </div>
            </div>
        `;

        // Grading Bar (if needed)
        let gradingBar = '';
        if (exam.grading) {
            const gradPct = Math.round((exam.grading.current / exam.grading.total) * 100);
            let fillClass = gradPct === 100 ? 'fill-green' : 'fill-orange';
            gradingBar = `
                <div class="pec-progress-group" style="margin-top:10px;">
                    <div class="pec-progress-label">
                        <span>채점 진행률</span>
                        <strong>${gradPct}% (${exam.grading.current}/${exam.grading.total})</strong>
                    </div>
                    <div class="pec-progress-track">
                        <div class="pec-progress-fill ${fillClass}" style="width: ${gradPct}%"></div>
                    </div>
                </div>
            `;
        }

        // 3. Footer Action
        let actionBtn = '';
        if (exam.status === 'grading_needed' || exam.status === 'running') {
            // Link to detailed grading page
            // If running, maybe just 'View Status', if grading_needed 'Start Grading'
            // For demo simplification, both go to exam_grading.html
            actionBtn = `<a href="exam_grading.html" class="pec-btn pec-btn-primary">
                            ${exam.status === 'grading_needed' ? '채점하러 가기' : '현황 보기'} <i class="fa-solid fa-chevron-right"></i>
                        </a>`;
        } else if (exam.status === 'done') {
            actionBtn = `<button class="pec-btn pec-btn-outline">결과 보기</button>`;
        } else {
            actionBtn = `<button class="pec-btn pec-btn-disabled">12/20 오픈</button>`;
        }

        card.innerHTML = `
            <div class="pec-header">
                <div class="pec-title-group">
                    <h3>${exam.title}</h3>
                    <span class="pec-badge-subject">${exam.subject}</span>
                </div>
                ${statusBadge}
            </div>
            <div class="pec-body">
                <div class="pec-info-row">
                    <i class="fa-regular fa-calendar"></i> ${exam.period}
                </div>
                ${partBar}
                ${gradingBar}
            </div>
            <div class="pec-footer">
                ${actionBtn}
            </div>
        `;

        grid.appendChild(card);
    });
}

function updateSummary() {
    // Determine counts from data (Mock logic)
    // In real app, this would be passed from backend or calc from full list
    let gradingTodo = EXAMS.filter(e => e.status === 'grading_needed').length;
    let running = EXAMS.filter(e => e.status === 'running').length;

    document.getElementById('sumGradingTodo').innerText = `${gradingTodo}건`;
    document.getElementById('sumRunning').innerText = `${running}건`;
}

window.addEventListener('DOMContentLoaded', initExamDashboard);
