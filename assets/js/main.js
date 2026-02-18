"use strict"
//выпадающий список
document.querySelector('.header-locations-btn').addEventListener('click', () => {
    document.querySelector('.header-locations-content').classList.toggle('active');
})

//бургер
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});


/* слайдер   */
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем только на мобильных
    if (window.innerWidth <= 550) {
        const slider = document.querySelector('#scroll-catalog');
        
        if (slider) {
            // ===== СВАЙП ПАЛЬЦЕМ =====
            let touchStartX = 0;
            let touchEndX = 0;
            let isScrolling = false;
            
            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                isScrolling = false;
            }, { passive: true });
            
            slider.addEventListener('touchmove', (e) => {
                if (isScrolling) return;
                touchEndX = e.touches[0].clientX;
            }, { passive: true });
            
            slider.addEventListener('touchend', () => {
                if (isScrolling) return;
                
                const diff = touchStartX - touchEndX;
                const threshold = 50; // Минимальное расстояние для свайпа
                
                if (Math.abs(diff) > threshold) {
                    const cards = slider.querySelectorAll('.minicatalog-item');
                    const cardWidth = cards[0].offsetWidth + 15; // ширина + отступ
                    
                    if (diff > 0) {
                        // Свайп влево - следующий слайд
                        slider.scrollBy({
                            left: cardWidth,
                            behavior: 'smooth'
                        });
                    } else {
                        // Свайп вправо - предыдущий слайд
                        slider.scrollBy({
                            left: -cardWidth,
                            behavior: 'smooth'
                        });
                    }
                }
            }, { passive: true });
            
            // ===== ПЕРЕТАСКИВАНИЕ МЫШЬЮ/ТАЧПАДОМ =====
            let isDown = false;
            let startX;
            let scrollLeft;
            
            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                slider.style.cursor = 'grabbing';
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });
            
            slider.addEventListener('mouseleave', () => {
                isDown = false;
                slider.style.cursor = 'grab';
            });
            
            slider.addEventListener('mouseup', () => {
                isDown = false;
                slider.style.cursor = 'grab';
            });
            
            slider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 2; // Множитель скорости
                slider.scrollLeft = scrollLeft - walk;
            });
            
            // ===== КЛИК ДЛЯ ЦЕНТРИРОВАНИЯ =====
            slider.addEventListener('click', (e) => {
                const card = e.target.closest('.minicatalog-item');
                if (!card) return;
                
                // Центрируем карточку при клике
                card.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest'
                });
            });
            
            // ===== АВТОМАТИЧЕСКАЯ ПРОКРУТКА ПРИ ЗАГРУЗКЕ =====
            // Прокручиваем к первому слайду для правильного выравнивания
            setTimeout(() => {
                const firstCard = slider.querySelector('.minicatalog-item');
                if (firstCard) {
                    firstCard.scrollIntoView({
                        inline: 'start',
                        block: 'nearest'
                    });
                }
            }, 100);
        }
    }
    
    // ===== ОБНОВЛЕНИЕ ПРИ ИЗМЕНЕНИИ РАЗМЕРА ОКНА =====
    window.addEventListener('resize', () => {
        if (window.innerWidth > 550) {
            // Возвращаем грид на десктопе
            const slider = document.querySelector('#scroll-catalog');
            if (slider) {
                slider.style.display = 'grid';
                slider.style.gap = '20px';
                slider.style.overflowX = 'visible';
                slider.style.scrollSnapType = 'none';
            }
        } else {
            // Возвращаем слайдер на мобильных
            const slider = document.querySelector('#scroll-catalog');
            if (slider) {
                slider.style.display = 'flex';
                slider.style.gap = '15px';
                slider.style.overflowX = 'auto';
                slider.style.scrollSnapType = 'x mandatory';
            }
        }
    });
});


//слайдер поп товары
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.minicatalog-popul-items');
    const items = document.querySelectorAll('.minicatalog-popul-item');
    const dots = document.querySelectorAll('.popul-pag');
    let currentIndex = 0;
    let startX = 0;
    let endX = 0;
    let isDragging = false;

    // Свайп пальцем
    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        endX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
        if (!isDragging) return;
        const diff = startX - endX;
        if (diff > 50) goToSlide(currentIndex + 1);
        else if (diff < -50) goToSlide(currentIndex - 1);
        isDragging = false;
    });

    // Навигация по индикаторам
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    function goToSlide(index) {
        if (index < 0) index = items.length - 1;
        if (index >= items.length) index = 0;
        
        currentIndex = index;
        const itemWidth = items[0].offsetWidth + 20; // ширина + gap
        slider.scrollTo({
            left: itemWidth * currentIndex,
            behavior: 'smooth'
        });
        
        updateDots();
    }

    function updateDots() {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Автообновление индикаторов при прокрутке
    slider.addEventListener('scroll', () => {
        const itemWidth = items[0].offsetWidth + 20;
        const scrollPosition = slider.scrollLeft;
        const newIndex = Math.round(scrollPosition / itemWidth);
        
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateDots();
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.news-items-detail');
    let startX = 0;
    let endX = 0;
    let isDragging = false;

    // Свайп пальцем
    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        endX = e.touches[0].clientX;
    });
});
//вкладки в контактах
const tabs2 = document.querySelectorAll('.shops-tab')
const content2 = document.querySelectorAll('.shops-content')

tabs2.forEach((tab, index) => {
  tab.addEventListener('click', function () {
    document.querySelector('.shops-tab.active').classList.remove('active')
    tab.classList.add('active');
    document.querySelector('.shops-content.active').classList.remove('active')
    content2[index].classList.add('active')
  })
})

//вкладки в личном кабинете
const tabs = document.querySelectorAll('.account-tab')
const content = document.querySelectorAll('.account-content')

tabs.forEach((tab, index) => {
  tab.addEventListener('click', function () {
    document.querySelector('.account-tab.active').classList.remove('active')
    tab.classList.add('active');
    document.querySelector('.account-content.active').classList.remove('active')
    content[index].classList.add('active')
  })
})

//вкладки в Product
const tabsProduct = document.querySelectorAll('.product-page-nal-tab')
const contentProduct = document.querySelectorAll('.product-page-nal-content')

tabsProduct.forEach((tab, index) => {
  tab.addEventListener('click', function () {
    document.querySelector('.product-page-nal-tab.active').classList.remove('active')
    tab.classList.add('active');
    document.querySelector('.product-page-nal-content.active').classList.remove('active')
    contentProduct[index].classList.add('active')
  })
})

//показ глаза и скрытие
document.addEventListener('DOMContentLoaded', function() {
    // Все кнопки показа пароля
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const wrapper = this.closest('.password-wrapper');
            const input = wrapper.querySelector('.password-input');
            const eyeIcon = this.querySelector('.eye-icon');
            const eyeOffIcon = this.querySelector('.eye-off-icon');
            
            // Переключение типа поля
            if (input.type === 'password') {
                input.type = 'text';
                wrapper.classList.add('password-visible');
                this.setAttribute('aria-label', 'Скрыть пароль');
            } else {
                input.type = 'password';
                wrapper.classList.remove('password-visible');
                this.setAttribute('aria-label', 'Показать пароль');
            }
            
            // Фокус на поле после переключения
            input.focus();
        });
    });
    
    // Скрытие пароля при потере фокуса (опционально)
    const passwordInputs = document.querySelectorAll('.password-input');
    passwordInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const wrapper = this.closest('.password-wrapper');
            const button = wrapper.querySelector('.toggle-password');
            
            // Если пароль показан, скрываем при потере фокуса
            if (this.type === 'text') {
                setTimeout(() => {
                    if (!this.matches(':focus')) {
                        this.type = 'password';
                        wrapper.classList.remove('password-visible');
                        button.setAttribute('aria-label', 'Показать пароль');
                    }
                }, 100);
            }
        });
    });
});

/* slidebar */
document.addEventListener("DOMContentLoaded", () => {

            const icons = document.querySelectorAll(".user_icon");
            const drawer = document.querySelector(".user-drawer");
            const overlay = document.querySelector(".user-overlay");

            if (!icons.length || !drawer || !overlay) return;

            function openDrawer() {
                drawer.classList.add("active");
                overlay.classList.add("active");
                document.body.style.overflow = "hidden";
            }

            function closeDrawer() {
                drawer.classList.remove("active");
                overlay.classList.remove("active");
                document.body.style.overflow = "";
            }

            icons.forEach(icon => {
                icon.addEventListener("click", e => {
                    e.preventDefault();
                    openDrawer();
                });
            });

            overlay.addEventListener("click", closeDrawer);

        });

//вкладки в плашке
const tabs3 = document.querySelectorAll('.user-drawer-tab');
const content3 = document.querySelectorAll('.user-drawer-form');

const drawerTitle = document.querySelector('.user-drawer-title');
const drawerDesc = document.querySelector('.user-drawer-desc');

tabs3.forEach((tab, index) => {
  tab.addEventListener('click', function () {

    document.querySelector('.user-drawer-tab.active').classList.remove('active');
    tab.classList.add('active');

    document.querySelector('.user-drawer-form.active').classList.remove('active');
    content3[index].classList.add('active');

    if (index === 0) {
      drawerTitle.textContent = 'Создайте аккаунт';
      drawerDesc.innerHTML = `Для этого укажите только<br>
      электронную почту, мы отправим<br>
      на нее данные для входа`;
    } else {
      drawerTitle.textContent = 'Войдите в аккаунт';
      drawerDesc.innerHTML = `Если у вас еще нет аккаунта,<br>
      перейдите на вкладку Регистрация<br>
      и зарегистрируйтесь в один клик`;
    }

  });
});


document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');

    /* REGEX */
    const nameRegex = /^[A-Za-zА-Яа-яЁё\s\-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    forms.forEach(form => {
        const submitBtn = form.querySelector('button[type="submit"], .btn-user-drawer');
        const inputs = Array.from(form.querySelectorAll('input'));
        const checkbox = form.querySelector('input[type="checkbox"]');

        function showError(input, message) {
            const error = input.closest('.form-gap')?.querySelector('.error-text');
            if (!error) return;
            error.style.display = 'block';
            input.classList.add('input-error');
            error.textContent = message;
        }

        function clearError(input) {
            const error = input.closest('.form-gap')?.querySelector('.error-text');
            if (!error) return;
            error.style.display = 'none';
            input.classList.remove('input-error');
            error.textContent = '';
        }

        function checkInput(input) {
            const value = input.value.trim();
            if (input.type === 'checkbox') return input.checked;
            if (!value) return false;
            if (input.type === 'email') return emailRegex.test(value);
            if (input.classList.contains('password-main')) return passwordRegex.test(value);
            if (input.classList.contains('password-confirm')) {
                const main = form.querySelector('.password-main');
                return value === (main ? main.value : '') && value.length > 0;
            }
            if (input.classList.contains('validate-name')) return nameRegex.test(value);
            return true;
        }

        function updateButtonState() {
            if (!submitBtn) return;
            const allValid = inputs.every(checkInput);
            if (form.classList.contains('user-drawer-form')) {
                submitBtn.disabled = !allValid;
                submitBtn.classList.toggle('btn-disabled', !allValid);
            }
        }

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (checkInput(input)) clearError(input);
                else {
                    if (input.type === 'checkbox') showError(input, 'Подтвердите согласие');
                    else if (input.classList.contains('password-confirm')) showError(input, 'Пароли не совпадают');
                    else if (input.type === 'email') showError(input, 'Некорректный email');
                    else if (input.classList.contains('password-main')) showError(input, 'Мин 8 символов, A-Z, a-z, цифра и спецсимвол');
                    else if (input.classList.contains('validate-name')) showError(input, 'Только буквы, пробел и -');
                    else showError(input, 'Поле обязательно');
                }
                updateButtonState();
            });

            input.addEventListener('blur', () => {
                if (!checkInput(input)) {
                    if (input.type === 'checkbox') showError(input, 'Подтвердите согласие');
                    else if (input.classList.contains('password-confirm')) showError(input, 'Пароли не совпадают');
                    else if (input.type === 'email') showError(input, 'Email обязателен');
                    else if (input.classList.contains('password-main')) showError(input, 'Пароль обязателен');
                    else if (input.classList.contains('validate-name')) showError(input, 'Поле обязательно');
                    else showError(input, 'Поле обязательно');
                } else clearError(input);
            });
        });

        form.addEventListener('submit', e => {
            let hasError = false;
            inputs.forEach(input => {
                if (!checkInput(input)) {
                    hasError = true;
                    if (input.type === 'checkbox') showError(input, 'Подтвердите согласие');
                    else if (input.classList.contains('password-confirm')) showError(input, 'Пароли не совпадают');
                    else if (input.type === 'email') showError(input, 'Email обязателен');
                    else if (input.classList.contains('password-main')) showError(input, 'Пароль обязателен');
                    else if (input.classList.contains('validate-name')) showError(input, 'Поле обязательно');
                    else showError(input, 'Поле обязательно');
                }
            });
            if (hasError) {
                e.preventDefault();
                updateButtonState();
                return;
            }

            // После успешного сабмита первой формы регистрации
            if (form.classList.contains('user-drawer-form') && submitBtn.classList.contains('btn-user-CODE')) {
                e.preventDefault();
                const drawerContent = form.parentElement;
                if (!drawerContent) return;

                drawerContent.innerHTML = `
                    <p class="Unbounded user-drawer-title">Последний шаг!</p>
                    <p class="user-drawer-desc">Теперь проверьте почту - отправили туда код для входа в личный кабинет, введите его, чтобы подтвердить свой аккаунт</p>
                    <form class="user-drawer-form active">
                        <div class="form-gap">
                            <input type="text" maxlength="10" placeholder="Код в смс">
                            <div class="error-text"></div>
                        </div>
                        <button class="header-btn btn-user-drawer Manrope">Завершить регистрацию</button>
                    </form>
                `;

                // Здесь можно добавить валидацию для нового поля ввода кода
            }
        });

        updateButtonState();
    });
});

//каталог продуктов
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('filterOverlay');
    const catDrawer = document.getElementById('catFilterDrawer');
    const optionsDrawer = document.getElementById('optionsFilterDrawer');
    
    const openCatBtn = document.getElementById('openCatFilter');
    const openOptionsBtn = document.getElementById('openOptionsFilter');
    
    const closeCatBtn = document.getElementById('closeCatFilter');
    const closeOptionsBtn = document.getElementById('closeOptionsFilter');
    
    let activeDrawer = null;
    
    // Функция открытия створки
    function openDrawer(drawer) {
        // Закрываем другую створку если открыта
        if (activeDrawer && activeDrawer !== drawer) {
            activeDrawer.classList.remove('active');
        }
        
        drawer.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        activeDrawer = drawer;
    }
    
    // Функция закрытия всех створок
    function closeAllDrawers() {
        catDrawer.classList.remove('active');
        optionsDrawer.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        activeDrawer = null;
    }
    
    // Открытие категорий
    openCatBtn.addEventListener('click', () => {
        openDrawer(catDrawer);
    });
    
    // Открытие характеристик
    openOptionsBtn.addEventListener('click', () => {
        openDrawer(optionsDrawer);
    });
    
    // Закрытие по крестикам
    closeCatBtn.addEventListener('click', closeAllDrawers);
    closeOptionsBtn.addEventListener('click', closeAllDrawers);
    
    // Закрытие по оверлею
    overlay.addEventListener('click', closeAllDrawers);
    
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllDrawers();
        }
    });
    
    // При ресайзе проверяем ширину
    function checkWidth() {
        if (window.innerWidth > 1034) {
            closeAllDrawers();
        }
    }
    
    window.addEventListener('resize', checkWidth);
});

//скрыть открыть радиокнопки
document.addEventListener('DOMContentLoaded', function() {
    initCollapseToggles();
});

function initCollapseToggles() {
    // Находим все контейнеры с collapse функционалом
    const collapseContainers = document.querySelectorAll('.collapse-container');
    
    collapseContainers.forEach(container => {
        const content = container.querySelector('.collapse-content');
        const toggleBtn = container.querySelector('.input-radio-a');
        
        if (!content || !toggleBtn) return;
        
        // Получаем все опции (включая скрытые)
        const allOptions = content.querySelectorAll('.input-radio-box');
        const visibleOptions = content.querySelectorAll('.input-radio-box:not(.hidden-option)');
        
        // Проверяем, нужно ли показывать кнопку (опций больше 5)
        if (allOptions.length <= 5) {
            toggleBtn.classList.add('hidden');
            return;
        }
        
        // Показываем только первые 5 опций
        allOptions.forEach((option, index) => {
            if (index >= 5) {
                option.classList.add('hidden-option');
            }
        });
        
        // Обработчик клика по кнопке
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const isExpanded = container.classList.contains('expanded');
            const hiddenOptions = content.querySelectorAll('.hidden-option');
            
            if (isExpanded) {
                // Сворачиваем
                container.classList.remove('expanded');
                toggleBtn.textContent = 'показать все';
                toggleBtn.setAttribute('data-expanded', 'false');
                
                // Плавное сворачивание
                hiddenOptions.forEach(opt => {
                    opt.style.display = 'none';
                });
            } else {
                // Разворачиваем
                container.classList.add('expanded');
                toggleBtn.textContent = 'скрыть';
                toggleBtn.setAttribute('data-expanded', 'true');
                
                // Плавное разворачивание
                hiddenOptions.forEach(opt => {
                    opt.style.display = 'block';
                });
            }
        });
    });
}

// Функция для динамического добавления новых опций
function addNewOption(container, optionHtml) {
    const content = container.querySelector('.collapse-content');
    const toggleBtn = container.querySelector('.input-radio-a');
    
    // Добавляем новую опцию
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = optionHtml;
    const newOption = tempDiv.firstElementChild;
    content.appendChild(newOption);
    
    // Проверяем количество опций
    const allOptions = content.querySelectorAll('.input-radio-box');
    const visibleCount = 5; // Количество видимых по умолчанию
    
    if (allOptions.length > 5) {
        // Если опций стало больше 5, показываем кнопку
        toggleBtn.classList.remove('hidden');
        
        // Скрываем лишние опции, если контейнер не развернут
        if (!container.classList.contains('expanded')) {
            allOptions.forEach((opt, index) => {
                if (index >= visibleCount) {
                    opt.classList.add('hidden-option');
                    opt.style.display = 'none';
                }
            });
        }
    }
}

//скрытие верхней шапки
document.addEventListener('DOMContentLoaded', function() {
    const headerUp = document.querySelector('.header-up');
    const headerDown = document.querySelector('.header-down');
    const burger = document.querySelector('.burger');
    let lastScrollTop = 0;
    let ticking = false;
    let isHidden = false;
    
    // Порог скролла для срабатывания
    const scrollThreshold = 50;
    
    // Функция для обновления позиции бургера
    function updateBurgerPosition(hidden) {
        if (!burger) return;
        
        if (hidden) {
            burger.classList.add('header-up-hidden');
        } else {
            burger.classList.remove('header-up-hidden');
        }
    }
    
    // Функция для плавного скрытия/показа
    function toggleHeaderUp(show) {
        if (show && isHidden) {
            headerUp.classList.remove('header-up-hidden');
            updateBurgerPosition(false);
            isHidden = false;
            
            // Добавляем анимацию появления
            headerUp.style.animation = 'slideDown 0.45s cubic-bezier(0.4, 0.0, 0.2, 1)';
            setTimeout(() => {
                headerUp.style.animation = '';
            }, 450);
            
        } else if (!show && !isHidden) {
            headerUp.classList.add('header-up-hidden');
            updateBurgerPosition(true);
            isHidden = true;
        }
    }
    
    // Функция для проверки ширины экрана и применения нужных значений
    function checkScreenSize() {
        // Эта функция нужна если потребуется дополнительная логика
        // CSS классы уже будут работать через медиа-запросы
    }
    
    // Обработчик скролла
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Определяем направление скролла
                if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                    // Скроллим вниз и проскроллили достаточно - прячем
                    toggleHeaderUp(false);
                }
                
                // Всегда показываем у самого верха
                if (scrollTop < 10) {
                    toggleHeaderUp(true);
                }
                
                lastScrollTop = Math.max(0, scrollTop);
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // Обработчик ресайза окна
    window.addEventListener('resize', function() {
        checkScreenSize();
    });
    
    // Инициализация при загрузке
    checkScreenSize();
    
    // Если страница загружена не в самом верху, скрываем верхнюю панель
    if (window.pageYOffset > 10) {
        headerUp.classList.add('header-up-hidden');
        updateBurgerPosition(true);
        isHidden = true;
    }
});