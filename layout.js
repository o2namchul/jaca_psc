/* layout.js */
const MENU_DATA = [
    { id: 'dashboard', label: '대시보드', icon: '📊', link: 'index.html' },
    {
        id: 'course', label: '과정관리', icon: '📖',
        subs: [
            { id: 'syllabus', label: '강의계획서', link: 'syllabus.html' },
            { id: 'notice', label: '공지사항', link: 'notice.html' },
            { id: 'lecture_list', label: '강의목록', link: 'lecture_list.html' }
        ]
    },
    {
        id: 'learning', label: '학습관리', icon: '👨‍🎓',
        subs: [
            { id: 'student_list', label: '학생관리', link: 'student_list.html' },
            { id: 'attendance', label: '출석부', link: 'attendance.html' },
            { id: 'discussion', label: '토론관리', link: 'discussion.html' },
            { id: 'assignment', label: '과제관리', link: 'assignment.html' },
            { id: 'exam_grading', label: '시험채점', link: 'exam_grading.html' }
        ]
    },
    {
        id: 'grade', label: '성적관리', icon: '📈',
        subs: [
            { id: 'grade_manage', label: '성적산출', link: 'grade_manage.html' },
            { id: 'grade_objection', label: '이의신청관리', link: 'grade_objection.html' }
        ]
    },
    {
        id: 'communication', label: '상담/소통', icon: '💬',
        subs: [
            { id: 'consulting', label: '1:1상담', link: 'consulting.html' },
            { id: 'message', label: '쪽지', link: 'message.html' },
            { id: 'forum_list', label: '토론방', link: 'forum_list.html' },
            { id: 'email_send', label: '이메일발송', link: 'email_send.html' }
        ]
    },
    {
        id: 'content', label: '콘텐츠관리', icon: '📂',
        subs: [
            { id: 'resource_library', label: '자료실', link: 'resource_library.html' },
            { id: 'content_manage', label: 'CDMS', link: 'content_manage.html' },
            { id: 'question_bank', label: '문항관리', link: 'question_bank.html' }
        ]
    }
];

function initLayout(activePageId) {
    // 1. 레이아웃 뼈대 생성
    const originalBody = document.body.innerHTML;
    document.body.innerHTML = '';

    // Security Features HTML
    const watermarkHTML = `<div class="security-watermark"></div>`;
    const securityModalHTML = `
        <div class="security-modal-overlay" id="securityModal">
            <div class="security-modal">
                <div class="security-modal-header">
                    <span><i class="fa-solid fa-file-shield"></i> 개인정보 다운로드 보안</span>
                    <i class="fa-solid fa-xmark" style="cursor:pointer;" onclick="closeSecurityModal()"></i>
                </div>
                <div class="security-modal-body">
                    <p style="margin-top:0; color:#666;">
                        학생들의 소중한 개인정보 보호를 위해 다운로드 사유를 입력해주세요.
                    </p>
                    <div style="margin-bottom:5px; font-weight:600;">다운로드 사유</div>
                    <select class="security-reason-select" id="secReasonSelect">
                        <option value="">사유를 선택하세요</option>
                        <option value="grade">성적 처리</option>
                        <option value="counsel">학생 상담</option>
                        <option value="admin">행정 업무</option>
                        <option value="other">기타</option>
                    </select>
                    <div style="margin-bottom:5px; font-weight:600;">상세 사유</div>
                    <input type="text" class="security-reason-input" id="secReasonInput" placeholder="예: 성적 마감을 위한 백업">
                </div>
                <div class="security-modal-footer">
                    <button class="btn-security-cancel" onclick="closeSecurityModal()">취소</button>
                    <button class="btn-security-confirm" onclick="confirmSecurityDownload()">확인 및 다운로드</button>
                </div>
            </div>
        </div>
    `;

    const layoutHTML = `
        ${watermarkHTML}
        ${securityModalHTML}
        <div id="app-sidebar">
            <div class="layout-logo" onclick="location.href='index.html'">
                이젠에듀 교수지원
            </div>
            <ul class="layout-menu-list" id="menu-container"></ul>
        </div>
        <div id="app-content-wrapper">
            <div id="app-header">
                <div class="layout-page-title" id="page-title-display"></div>
                
                <div style="display:flex; align-items:center; gap:20px;">
                    <!-- Session Timer -->
                    <div class="security-session-timer" id="sessionTimer">
                        <i class="fa-regular fa-clock"></i> <span id="timerDisplay">30:00</span>
                        <button class="btn-timer-extend" onclick="resetTimer()">연장</button>
                    </div>

                    <div class="layout-user-info">
                        <span><strong>김이젠</strong> 교수님 (경영학부)</span>
                        <span style="font-size:0.8rem; color:#999;">최종접속: 2024.12.11 10:00</span>
                        <div class="layout-avatar" onclick="location.href='mypage.html'">
                             <i class="fas fa-user"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div id="main-content">
                ${originalBody}
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', layoutHTML);

    // 2. 메뉴 렌더링
    const menuContainer = document.getElementById('menu-container');
    let pageTitle = "Main Dashboard";

    MENU_DATA.forEach(menu => {
        let hasSub = menu.subs && menu.subs.length > 0;
        let isActiveCategory = false;
        let subHtml = '';

        if (hasSub) {
            subHtml = `<ul class="layout-submenu {SUB_OPEN}">`;
            menu.subs.forEach(sub => {
                const isActive = (sub.id === activePageId);
                if (isActive) {
                    isActiveCategory = true;
                    pageTitle = sub.label;
                }
                subHtml += `<li><a href="${sub.link}" class="layout-sub-link ${isActive ? 'active' : ''}">- ${sub.label}</a></li>`;
            });
            subHtml += `</ul>`;
        } else {
            if (menu.id === activePageId) pageTitle = menu.label;
        }

        subHtml = subHtml.replace('{SUB_OPEN}', isActiveCategory ? 'open' : '');

        const html = `
            <li class="layout-menu-item">
                <a href="${menu.link || '#'}" class="layout-menu-link ${isActiveCategory ? 'active' : ''}" ${hasSub ? 'onclick="toggleMenu(this)"' : ''}>
                    <span>${menu.icon} ${menu.label}</span>
                    ${hasSub ? '▼' : ''}
                </a>
                ${subHtml}
            </li>
        `;
        menuContainer.insertAdjacentHTML('beforeend', html);
    });

    // 3. 페이지 제목 설정
    const titleEl = document.getElementById('page-title-display');
    if (titleEl) titleEl.innerText = pageTitle;

    // 4. Start Timer
    startSessionTimer();

    // 5. Toast Container
    if (!document.querySelector('.security-toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'security-toast-container';
        document.body.appendChild(toastContainer);
    }
}

function toggleMenu(el) {
    const sub = el.nextElementSibling;
    if (sub) sub.classList.toggle('open');
}

// =========================================
// Global Security Functions
// =========================================

// ... (Timer and Modal functions unchanged)

// 1. Session Timer Logic
let timeLeft = 1800; // 30 mins
let timerInterval;

function startSessionTimer() {
    const display = document.getElementById('timerDisplay');
    const container = document.getElementById('sessionTimer');

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;

        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;
        display.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

        if (timeLeft <= 300) { // 5 min warning
            container.classList.add('low-time');
        } else {
            container.classList.remove('low-time');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('세션이 만료되어 로그아웃됩니다.');
            location.href = 'login.html';
        }
    }, 1000);
}

function resetTimer() {
    timeLeft = 1800; // Reset to 30 min
    // alert('로그인 유효시간이 30분 연장되었습니다.');
    showToast('로그인 연장', '유효시간이 30분 연장되었습니다.', 'success');
    const container = document.getElementById('sessionTimer');
    container.classList.remove('low-time');
}

// 2. Excel Download Security Modal
function openSecurityModal() {
    const modal = document.getElementById('securityModal');
    // Clear fields
    document.getElementById('secReasonSelect').value = '';
    document.getElementById('secReasonInput').value = '';
    modal.classList.add('active');
}

function closeSecurityModal() {
    document.getElementById('securityModal').classList.remove('active');
}

function confirmSecurityDownload() {
    const reason = document.getElementById('secReasonSelect').value;
    const detail = document.getElementById('secReasonInput').value;

    if (!reason || !detail.trim()) {
        // alert('다운로드 사유를 모두 입력해주세요.');
        showToast('입력 오류', '다운로드 사유를 모두 입력해주세요.', 'error');
        return;
    }

    // Logic to proceed download
    // alert(`[보안 기록 저장됨]\n사유: ${reason}/${detail}\n\n다운로드를 시작합니다.`);
    showToast('보안 기록 저장 완료', `다운로드를 시작합니다.<br>사유: ${reason}`, 'success');
    closeSecurityModal();
}

// 3. Masking Toggle Logic
function toggleMasking(checkbox) {
    const isMasked = checkbox.checked;
    const names = document.querySelectorAll('.privacy-name');
    const phones = document.querySelectorAll('.privacy-phone');
    const ids = document.querySelectorAll('.privacy-id');

    if (!isMasked) {
        // Warning when turning OFF masking
        showToast('개인정보 열람 경고', '개인정보 보호 모드가 해제되었습니다.<br>모든 열람 기록은 로그에 저장됩니다.', 'warning');
        console.log('Masking turned OFF. Access logged.'); // Keep for debug
    } else {
        showToast('개인정보 보호', '개인정보 보호 모드가 활성화되었습니다.', 'success');
    }

    names.forEach(el => {
        if (isMasked) {
            const original = el.getAttribute('data-original');
            if (original && original.length > 1) {
                const first = original.charAt(0);
                const last = original.charAt(original.length - 1);
                el.innerText = first + '*'.repeat(original.length - 2) + last;
            } else {
                el.innerText = original;
            }
        } else {
            el.innerText = el.getAttribute('data-original');
        }
    });

    phones.forEach(el => {
        if (isMasked) {
            const original = el.getAttribute('data-original');
            const parts = original.split('-');
            if (parts.length === 3) {
                el.innerText = `${parts[0]}-${parts[1]}-****`;
            } else {
                el.innerText = original.substring(0, original.length - 4) + '****';
            }
        } else {
            el.innerText = el.getAttribute('data-original');
        }
    });

    ids.forEach(el => {
        if (isMasked) {
            const original = el.getAttribute('data-original');
            if (original.length > 4) {
                el.innerText = original.substring(0, 4) + '***';
            } else {
                el.innerText = '****';
            }
        } else {
            el.innerText = el.getAttribute('data-original');
        }
    });
}

// 4. Toast Notification Function
function showToast(title, message, type = 'info') {
    const container = document.querySelector('.security-toast-container');
    if (!container) return; // Should be created in initLayout

    const toast = document.createElement('div');
    toast.className = `security-toast ${type}`;

    let iconClass = 'fa-circle-info';
    if (type === 'warning') iconClass = 'fa-triangle-exclamation';
    if (type === 'error') iconClass = 'fa-circle-exclamation';
    if (type === 'success') iconClass = 'fa-circle-check';

    toast.innerHTML = `
        <i class="fa-solid ${iconClass} security-toast-icon"></i>
        <div class="security-toast-content">
            <div class="security-toast-title">${title}</div>
            <div class="security-toast-message">${message}</div>
        </div>
        <i class="fa-solid fa-xmark security-toast-close" onclick="this.parentElement.remove()"></i>
    `;

    container.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'fadeOutRight 0.3s forwards';
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }
    }, 4000);
}
