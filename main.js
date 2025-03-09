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
            // Work ページの場合、プロジェクトタイトルをアニメーション
            if (targetId === 'work') {
                const projectTitles = document.querySelectorAll('.project-title');
                
                // 初期状態を設定
                gsap.set(projectTitles, {
                    opacity: 0,
                    x: 100
                });

                // プロジェクトタイトルを表示
                gsap.to('.work-projects', {
                    opacity: 1,  // フェードイン
                    duration: 0.5,
                    ease: 'power2.out',
                    onComplete: () => {
                        // 各タイトルをアニメーション
                        projectTitles.forEach((title, index) => {
                            gsap.to(title, {
                                duration: 1,
                                opacity: 1,
                                x: 0,
                                ease: 'bounce.out',  // バウンスエフェクト
                                delay: 0.2 * index  // タイトルごとに遅延
                            });
                        });
                    }
                });
            }
            
            // スキルページの場合、プログレスバーをアニメーション
            if (targetId === 'skill') {
                // プログレスバーの初期化
                gsap.set('.progress', {
                    width: 0
                });
                
                // プログレスバーのアニメーション
                const progressBars = document.querySelectorAll('.progress');
                progressBars.forEach((bar, index) => {
                    const level = bar.getAttribute('data-level');
                    gsap.to(bar, {
                        width: `${level * 20}%`,
                        duration: 1,
                        ease: 'power2.out',
                        delay: index * 0.2
                    });
                });
            }
        }
    });

    currentPage = targetId;
}

// DOMContentLoadedで初期状態を設定
document.addEventListener('DOMContentLoaded', () => {
    // プロジェクトタイトルを非表示に設定
    const projectTitles = document.querySelectorAll('.project-title');
    gsap.set(projectTitles, {
        opacity: 0,
        x: 100
    });

    // イントロアニメーションを実行
    playIntroAnimation();
});

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
    }, '-=0.5')
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
            currentPage = 'about';  // 現在のページを更新
        }
    });
}

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

// ハンバーガーメニューの制御
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // メニューリンクをクリックした時にメニューを閉じる
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});

// ロゴクリックのイベントリスナーを修正
document.querySelector('.logo').addEventListener('click', () => {
    // 現在のページをフェードアウト
    gsap.to('.page', {
        duration: 0.8,
        opacity: 0,
        y: '100%',
        ease: 'power2.inOut',
        onComplete: () => {
            // イントロ要素を表示してアニメーション開始
            const intro = document.getElementById('intro');
            gsap.set(intro, { 
                display: 'flex',
                opacity: 1 
            });

            // イントロテキストを初期状態に戻す
            gsap.set('.text-line', {
                opacity: 0,
                filter: 'blur(10px)'
            });

            // イントロアニメーションを再生
            const tl = gsap.timeline();
            
            tl.to('.text-line:first-child', {
                duration: 1,
                opacity: 1,
                filter: 'blur(0px)',
                ease: 'power2.out'
            })
            .to('.text-line:last-child', {
                duration: 1,
                opacity: 1,
                filter: 'blur(0px)',
                ease: 'power2.out'
            }, '-=0.5')
            .to({}, { duration: 2 })
            .to('#intro', {
                duration: 1.5,
                opacity: 0,
                ease: 'power2.inOut',
                onComplete: () => {
                    gsap.set('#intro', { display: 'none' });
                    // About ページを表示
                    gsap.to('#about', {
                        duration: 0.8,
                        opacity: 1,
                        y: '0%',
                        ease: 'power2.inOut'
                    });
                    currentPage = 'about';
                }
            });
        }
    });
});