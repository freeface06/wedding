document.addEventListener('DOMContentLoaded', () => {
    // 1. Swiper.js 초기화 (갤러리)
    const swiper = new Swiper('.mySwiper', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    // 2. 아코디언 메뉴 동작 (계좌번호)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Toggle current item
            item.classList.toggle('active');
            
            // 기본 동작 제어 (하나만 열리게 하려면 아래 코드 주석 해제)
            /*
            const siblings = document.querySelectorAll('.accordion-item');
            siblings.forEach(sibling => {
                if(sibling !== item) {
                    sibling.classList.remove('active');
                }
            });
            */
        });
    });

    // 3. 계좌번호 복사 기능
    const copyButtons = document.querySelectorAll('.btn-copy');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 버튼 요소의 부모 요소(account-row) 내부에서 계좌번호(acc-num) 값을 찾음
            const row = e.target.closest('.account-row');
            const accNum = row.querySelector('.acc-num').innerText;
            
            // 하이픈(-) 제거
            const cleanAccNum = accNum.replace(/-/g, '');
            
            navigator.clipboard.writeText(cleanAccNum).then(() => {
                alert('계좌번호가 복사되었습니다.');
            }).catch(err => {
                console.error('복사 실패:', err);
                alert('복사에 실패했습니다. 직접 선택하여 복사해 주세요.');
            });
        });
    });

    // 4. D-Day 카운트다운
    const weddingDate = new Date('2026-04-18T12:00:00');

    function updateCountdown() {
        const now = new Date();
        const diff = weddingDate - now;

        if (diff <= 0) {
            document.getElementById('countdown').innerHTML = "<span>00</span><span class='colon'>:</span><span>00</span><span class='colon'>:</span><span>00</span><span class='colon'>:</span><span>00</span>";
            document.getElementById('d-day-result').innerText = "오늘";
            document.querySelector('.d-day-text').innerHTML = "오늘은 기홍, 지현의 <b>결혼식 당일</b>입니다. 축하해 주세요!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('d-days').innerText = days.toString().padStart(2, '0');
        document.getElementById('d-hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('d-mins').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('d-secs').innerText = seconds.toString().padStart(2, '0');
        
        document.getElementById('d-day-result').innerText = `${days}일`;
    }

    if (document.getElementById('countdown')) {
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }
});
