// ページの状態管理
let currentPage = null;

// ページ遷移のアニメーション
function navigateToPage(targetId) {
    if (targetId === currentPage) return;

    // 全てのページを非表示にする
    gsap.to('.page', {
        duration: 0.8,
        opacity: 0,
        y: '100%',
        ease: 'power2.inOut'
    });

    // 新しいページを表示
    gsap.to(`#${targetId}`, {
        duration: 0.8,
        opacity: 1,
        y: '0%',
        ease: 'power2.inOut',
        delay: 0.3,
        onComplete: () => {
            // スキルページの場合、プログレスバーをアニメーション
            if (targetId === 'skill') {
                gsap.from('.progress', {
                    width: 0,
                    duration: 1,
                    ease: 'power2.out',
                    stagger: 0.2
                });
            }
        }
    });

    currentPage = targetId;
}

// イントロアニメーション
function playIntroAnimation() {
    // 最初に全ての要素の初期状態を設定
    gsap.set('.page', {
        opacity: 0,
        y: '100%'
    });

    // イントロアニメーションのタイムライン
    const tl = gsap.timeline();
    
    // 1行目のアニメーション
    tl.to('.text-line:first-child', {
        duration: 1,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power2.out'
    })
    // 2行目のアニメーション
    .to('.text-line:last-child', {
        duration: 1,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power2.out'
    }, '-=0.5')  // 1行目のアニメーションと少し重ねる
    // 2秒待機
    .to({}, { duration: 2 })
    // イントロ全体をフェードアウト
    .to('#intro', {
        duration: 1.5,
        opacity: 0,
        ease: 'power2.inOut',
        onComplete: () => {
            gsap.set('#intro', { display: 'none' });
            navigateToPage('about');
        }
    });
}

// DOMContentLoadedとloadの両方でイントロアニメーションを確実に実行
document.addEventListener('DOMContentLoaded', playIntroAnimation);

// ナビゲーションのクリックイベント
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-target');
        navigateToPage(target);
    });
});

// フォーム送信のイベントリスナーを追加
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                subject: contactForm.subject.value,
                message: contactForm.message.value
            };

            // ここにフォーム送信の処理を追加
            // 例: console.log(formData);
            
            // 送信成功のフィードバック
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#45a049';
            
            // フォームをリセット
            contactForm.reset();
            
            // ボタンのテキストを元に戻す
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '#4CAF50';
            }, 3000);
        });
    }
});