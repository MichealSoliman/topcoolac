const servicesLinks = [
    { name: "جميع الخدمات", url: "/services/" },
    { name: "تنظيف المكيفات بجدة", url: "/ac-cleaning-and-washing-in-jeddah/" },
    { name: "فك وتركيب المكيفات", url: "/ac-removal-installation-jeddah/" },
    { name: "صيانة وإصلاح المكيفات", url: "/ac-maintenance-repair-jeddah/" },
    { name: "تمديد مواسير النحاس", url: "/ac-copper-piping-extension-jeddah/" },
    { name: "تعبئة وفحص الفريون", url: "/ac-freon-recharging-in-jeddah/" },
    { name: "تركيب مكيفات سبليت", url: "/ac-split-installation-jeddah/" },
    { name: "صيانة وتنظيف مكيفات سبليت بجدة", url: "/ac-split-maintenance-cleaning-jeddah/" },
    { name: "تركيب مكيفات شباك بجدة", url: "/window-ac-installation-jeddah/" },
    { name: "فني مكيفات بجدة", url: "/ac-technician-in-jeddah/" },
    { name: "تأسيس مكيفات بجدة", url: "/ac-foundation-in-jeddah/" },
];
    
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    // --- 1. Desktop Dropdown ---
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(btn => {
        if (btn.textContent.includes('الخدمات') && btn.textContent.includes('▼')) {
            const parent = btn.parentElement;
            if (parent && parent.classList.contains('group')) {
                const dropdownDiv = parent.querySelector('div.absolute');
                if (dropdownDiv) {
                    // Add fixed height and scroll
                    dropdownDiv.classList.add('max-h-72', 'overflow-y-auto');
                    
                    dropdownDiv.innerHTML = servicesLinks.map((link, index) => {
                        const isFirst = index === 0;
                        const borderClass = isFirst ? '' : 'border-t border-gray-100';
                        const isAllServices = link.url === '/services/';
                        const bgHighlight = isAllServices ? 'bg-primary/5 border-b border-primary/20 mb-1' : '';
                        
                        const isActive = currentPath === link.url || currentPath === link.url.slice(0, -1) || currentPath + '/' === link.url;
                        const activeClass = isActive || isAllServices ? 'font-bold text-primary' : 'text-gray-700';
                        
                        return `<a href="${link.url}" class="block px-4 py-2.5 text-sm ${activeClass} ${bgHighlight} hover:bg-primary/10 hover:text-primary transition-all duration-200 text-right ${borderClass}">${link.name}</a>`;
                    }).join('');
                }
            }
        }
    });

    // --- 2. Mobile Menu (optional enhancements) ---
    const mobileMenu = document.getElementById('mobileMenu') || document.getElementById('mobile-menu');
    if (mobileMenu) {
        const links = Array.from(mobileMenu.querySelectorAll('a'));
        const aboutLink = links.find(a => a.textContent.includes('من نحن'));
        
        if (aboutLink) {
            if (!document.getElementById('mobile-services-accordion')) {
                // Remove existing hardcoded service links
                links.forEach(a => {
                    const isServiceLink = servicesLinks.some(s => s.url === a.getAttribute('href') || s.url.slice(0,-1) === a.getAttribute('href'));
                    if (isServiceLink && !a.getAttribute('href').includes('/services/')) {
                        a.remove();
                    }
                });

                // Create accordion
                const accordionHtml = `
                <div id="mobile-services-accordion" class="w-full">
                    <button id="mobile-services-btn" class="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary/5 transition-all duration-300 text-dark font-semibold">
                        <div class="flex items-center gap-3">
                            الخدمات
                        </div>
                        <span id="mobile-services-icon" class="transition-transform duration-300">▼</span>
                    </button>
                    <div id="mobile-services-list" class="hidden flex-col gap-1 pl-4 pr-2 py-2 bg-gray-50/50 rounded-lg mt-1 max-h-64 overflow-y-auto">
                        ${servicesLinks.map((link) => {
                            const isAllServices = link.url === '/services/';
                            const bgHighlight = isAllServices ? 'bg-primary/10 border-r-2 border-primary mb-1' : '';
                            const isActive = currentPath === link.url || currentPath === link.url.slice(0, -1);
                            const activeClass = isActive || isAllServices ? 'font-bold text-primary' : 'text-dark font-medium';
                            return `<a href="${link.url}" class="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-primary/10 transition-all duration-300 ${activeClass} ${bgHighlight} text-sm">
                                ${link.name}
                            </a>`;
                        }).join('')}
                    </div>
                </div>`;
                
                aboutLink.insertAdjacentHTML('afterend', accordionHtml);
                
                const btn = document.getElementById('mobile-services-btn');
                const list = document.getElementById('mobile-services-list');
                const icon = document.getElementById('mobile-services-icon');
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    list.classList.toggle('hidden');
                    list.classList.toggle('flex');
                    if (list.classList.contains('hidden')) {
                        icon.style.transform = 'rotate(0deg)';
                    } else {
                        icon.style.transform = 'rotate(180deg)';
                    }
                });
            }
        }
    }
});
