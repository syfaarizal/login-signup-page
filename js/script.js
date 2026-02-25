document.addEventListener('DOMContentLoaded', function () {

    /* ─── Element References ─────────────────────────────── */
    const container          = document.getElementById('container');
    const loginForm          = document.getElementById('loginForm');
    const signupForm         = document.getElementById('signupForm');

    const loginContainer     = document.querySelector('.login-container');
    const signupContainer    = document.querySelector('.sign-up-container');

    // Desktop overlay buttons
    const signInButton       = document.getElementById('signInButton');
    const signUpButton       = document.getElementById('signUpButton');

    // Mobile switch links
    const mobileGoToLogin    = document.getElementById('mobileGoToLogin');
    const mobileGoToSignup   = document.getElementById('mobileGoToSignup');

    // Password fields & toggles
    const loginPassword      = document.getElementById('loginPassword');
    const signupPassword     = document.getElementById('signupPassword');
    const toggleLoginPw      = document.getElementById('toggleLoginPassword');
    const toggleSignupPw     = document.getElementById('toggleSignupPassword');

    // Forgot password link
    const forgotPassword     = document.getElementById('forgotPassword');

    /* ─── Detect Mobile ──────────────────────────────────── */
    const isMobile = () => window.innerWidth <= 768;

    /* ─── Panel Switching ────────────────────────────────── */
    function showLogin() {
        if (isMobile()) {
            signupContainer.classList.remove('mobile-active');
            loginContainer.classList.add('mobile-active');
        } else {
            container.classList.remove('right-panel-active');
        }
    }

    function showSignup() {
        if (isMobile()) {
            loginContainer.classList.remove('mobile-active');
            signupContainer.classList.add('mobile-active');
        } else {
            container.classList.add('right-panel-active');
        }
    }

    // Desktop
    signInButton.addEventListener('click', showLogin);
    signUpButton.addEventListener('click', showSignup);

    // Mobile
    mobileGoToLogin.addEventListener('click', showLogin);
    mobileGoToSignup.addEventListener('click', showSignup);

    /* ─── Initial Mobile State ───────────────────────────── */
    function initMobileState() {
        if (isMobile()) {
            loginContainer.classList.add('mobile-active');
            signupContainer.classList.remove('mobile-active');
        } else {
            // Reset any leftover mobile classes on resize to desktop
            loginContainer.classList.remove('mobile-active');
            signupContainer.classList.remove('mobile-active');
        }
    }

    initMobileState();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initMobileState, 150);
    });

    /* ─── Password Visibility Toggle ────────────────────── */
    function togglePassword(field, icon) {
        const isHidden = field.type === 'password';
        field.type = isHidden ? 'text' : 'password';
        icon.classList.toggle('fa-eye', !isHidden);
        icon.classList.toggle('fa-eye-slash', isHidden);

        // Brief pop animation
        icon.style.transition = 'transform 0.2s ease';
        icon.style.transform  = 'translateY(-50%) scale(1.25)';
        setTimeout(() => {
            icon.style.transform = 'translateY(-50%) scale(1)';
        }, 200);
    }

    toggleLoginPw.addEventListener('click',  () => togglePassword(loginPassword,  toggleLoginPw));
    toggleSignupPw.addEventListener('click', () => togglePassword(signupPassword, toggleSignupPw));

    /* ─── Toast Notification ─────────────────────────────── */
    function showToast(message, type = 'success') {
        // Remove existing toast
        document.querySelectorAll('.toast').forEach(t => t.remove());

        const icon    = type === 'success' ? 'check-circle' : 'exclamation-circle';
        const bgColor = type === 'success'
            ? 'linear-gradient(135deg, #43b97f, #2e9e65)'
            : 'linear-gradient(135deg, #ff6b6b, #e84545)';

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
            <button class="toast-close" aria-label="Close"><i class="fas fa-times"></i></button>
        `;

        Object.assign(toast.style, {
            position:     'fixed',
            top:          '20px',
            right:        '20px',
            padding:      '14px 20px',
            borderRadius: '12px',
            background:   bgColor,
            color:        '#fff',
            display:      'flex',
            alignItems:   'center',
            gap:          '10px',
            zIndex:       '9999',
            boxShadow:    '0 8px 24px rgba(0,0,0,0.18)',
            fontSize:     '14.5px',
            fontWeight:   '600',
            maxWidth:     '340px',
            animation:    'toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards',
        });

        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.style.cssText = 'background:none;border:none;color:#fff;cursor:pointer;font-size:15px;padding:2px;margin-left:4px;opacity:0.8;';

        function removeToast() {
            toast.style.animation = 'toastOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }

        closeBtn.addEventListener('click', removeToast);
        setTimeout(removeToast, 5000);

        document.body.appendChild(toast);
    }

    /* ─── Input Validation ───────────────────────────────── */
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    function markField(field, valid) {
        field.style.borderColor = valid ? 'transparent' : '#ff6b6b';
        if (valid) {
            field.style.boxShadow = '';
        } else {
            field.style.boxShadow = '0 0 0 4px rgba(255,107,107,0.15)';
            field.focus();
        }
    }

    /* ─── Simulate API Call ──────────────────────────────── */
    function simulateApiCall() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.25 ? resolve() : reject();
            }, 900);
        });
    }

    /* ─── Button Loading State ───────────────────────────── */
    function setLoading(btn, loading) {
        btn.disabled = loading;
        if (loading) {
            btn.dataset.label = btn.querySelector('span').textContent;
            btn.querySelector('span').textContent = 'Please wait...';
            btn.querySelector('i').className = 'fas fa-spinner fa-spin';
        } else {
            btn.querySelector('span').textContent = btn.dataset.label || '';
            btn.querySelector('i').className = 'fas fa-arrow-right';
        }
    }

    /* ─── Login Form Submit ──────────────────────────────── */
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email    = document.getElementById('loginEmail');
        const password = loginPassword;
        const btn      = this.querySelector('button[type="submit"]');

        let valid = true;

        if (!isValidEmail(email.value)) {
            markField(email, false);
            valid = false;
        } else {
            markField(email, true);
        }

        if (password.value.length < 1) {
            markField(password, false);
            valid = false;
        } else {
            markField(password, true);
        }

        if (!valid) {
            showToast('Please fill in all fields correctly.', 'error');
            return;
        }

        setLoading(btn, true);

        simulateApiCall()
            .then(() => {
                showToast('Login successful! Welcome back 👋', 'success');
                loginForm.reset();
            })
            .catch(() => {
                showToast('Invalid email or password. Try again.', 'error');
            })
            .finally(() => setLoading(btn, false));
    });

    /* ─── Signup Form Submit ─────────────────────────────── */
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('signupUsername');
        const email    = document.getElementById('signupEmail');
        const password = signupPassword;
        const btn      = this.querySelector('button[type="submit"]');

        let valid = true;

        if (username.value.trim().length < 3) {
            markField(username, false);
            valid = false;
        } else {
            markField(username, true);
        }

        if (!isValidEmail(email.value)) {
            markField(email, false);
            valid = false;
        } else {
            markField(email, true);
        }

        if (password.value.length < 6) {
            markField(password, false);
            valid = false;
        } else {
            markField(password, true);
        }

        if (!valid) {
            showToast('Please fill all fields correctly. Password must be 6+ chars.', 'error');
            return;
        }

        setLoading(btn, true);

        simulateApiCall()
            .then(() => {
                showToast('Account created! Please login 🎉', 'success');
                signupForm.reset();
                setTimeout(showLogin, 1000);
            })
            .catch(() => {
                showToast('Email already in use. Try a different one.', 'error');
            })
            .finally(() => setLoading(btn, false));
    });

    /* ─── Forgot Password ────────────────────────────────── */
    forgotPassword.addEventListener('click', function () {
        const email = prompt('Enter your email to receive a reset link:');
        if (!email) return;

        if (!isValidEmail(email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        showToast('Reset link sent! Check your inbox 📬', 'success');
    });

    /* ─── Decorative floating hearts (desktop only) ──────── */
    if (!isMobile()) {
        const shapes   = document.querySelector('.bg-shapes');
        const emojis   = ['❤️', '✨', '💜', '🌸'];
        const count    = 6;

        for (let i = 0; i < count; i++) {
            const el = document.createElement('span');
            el.textContent = emojis[i % emojis.length];
            Object.assign(el.style, {
                position:  'absolute',
                fontSize:  `${18 + Math.random() * 16}px`,
                opacity:   `${0.12 + Math.random() * 0.15}`,
                top:       `${Math.random() * 100}%`,
                left:      `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
                userSelect:'none',
                pointerEvents:'none',
            });
            shapes && shapes.appendChild(el);
        }
    }

});