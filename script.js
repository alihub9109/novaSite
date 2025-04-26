document.addEventListener('DOMContentLoaded', function() {
    // Pricing data
    const pricingData = {
      monthly: {
        free: 0,
        startup: 39,
        team: 89,
        enterprise: 149,
        discountText: "Save up to 10%"
      },
      annually: {
        free: 0,
        startup: 35,
        team: 80,
        enterprise: 134,
        discountText: "Save up to 10%"
      }
    };
  
    // Get DOM elements
    const pricingSwitch = document.getElementById('pricing-switch');
    const monthlyLabel = document.querySelectorAll('label[for="pricing-switch"]')[0];
    const annuallyLabel = document.querySelectorAll('label[for="pricing-switch"]')[2];
    const discountBadge = document.querySelector('.mt-3 span.bg-blue-600');
  
    // Pricing card elements
    const cards = document.querySelectorAll('.flex.flex-col.border, .flex.flex-col.border-2');
  
    const [freeCard, startupCard, teamCard, enterpriseCard] = cards;
  
    const freePriceEl = freeCard?.querySelector('span.font-bold.text-5xl');
    const startupPriceEl = startupCard?.querySelector('span.font-bold.text-5xl');
    const teamPriceEl = teamCard?.querySelector('span.font-bold.text-5xl');
    const enterprisePriceEl = enterpriseCard?.querySelector('span.font-bold.text-5xl');
  
    const freeBtn = freeCard?.querySelector('a.inline-block.w-full');
    const startupBtn = startupCard?.querySelector('a.inline-block.w-full');
    const teamBtn = teamCard?.querySelector('a.inline-block.w-full');
    const enterpriseBtn = enterpriseCard?.querySelector('a.inline-block.w-full');
  
    let currentlySelectedCard = startupCard;
  
    // Update Prices
    function updatePrices(isAnnual) {
      const plan = isAnnual ? 'annually' : 'monthly';
      const data = pricingData[plan];
  
      updatePriceElement(freePriceEl, data.free);
      updatePriceElement(startupPriceEl, data.startup);
      updatePriceElement(teamPriceEl, data.team);
      updatePriceElement(enterprisePriceEl, data.enterprise);
  
      if (discountBadge) {
        discountBadge.textContent = data.discountText;
      }
  
      // Highlight correct label
      if (isAnnual) {
        monthlyLabel?.classList.remove('font-semibold', 'text-blue-600', 'dark:text-blue-500');
        annuallyLabel?.classList.add('font-semibold', 'text-blue-600', 'dark:text-blue-500');
      } else {
        monthlyLabel?.classList.add('font-semibold', 'text-blue-600', 'dark:text-blue-500');
        annuallyLabel?.classList.remove('font-semibold', 'text-blue-600', 'dark:text-blue-500');
      }
    }
  
    // Animate price change
    function updatePriceElement(element, newPrice) {
      if (!element) return;
  
      element.classList.add('transition', 'duration-300', 'ease-in-out', 'transform', 'scale-110');
  
      setTimeout(() => {
        element.innerHTML = newPrice === 0
          ? 'Free'
          : `<span class="font-bold text-2xl -me-2">$</span>${newPrice}`;
  
        setTimeout(() => {
          element.classList.remove('scale-110');
        }, 300);
      }, 150);
    }
  
    // Highlight Card
    function highlightCard(card) {
      [freeCard, startupCard, teamCard, enterpriseCard].forEach(c => {
        if (!c) return;
  
        // Reset cards
        c.classList.remove('border-2', 'border-blue-600', 'shadow-xl', 'dark:border-blue-700', 'bg-blue-50/50', 'dark:bg-blue-900/20');
        c.classList.add('border', 'border-gray-200', 'shadow-2xs', 'dark:border-neutral-800', 'bg-white', 'dark:bg-neutral-900');
  
        // Reset button styles
        const btn = c.querySelector('a.inline-block.w-full');
        if (btn) {
          btn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
          btn.classList.add('bg-gray-800', 'hover:bg-gray-900', 'dark:bg-neutral-800', 'dark:hover:bg-neutral-700');
        }
  
        // Remove only "Selected" badges
        const selectedBadge = c.querySelector('span[data-selected="true"]');
        selectedBadge?.parentElement?.remove();
      });
  
      // Now highlight selected
      if (card) {
        card.classList.remove('border', 'border-gray-200', 'shadow-2xs', 'dark:border-neutral-800', 'bg-white', 'dark:bg-neutral-900');
        card.classList.add('border-2', 'border-blue-600', 'shadow-xl', 'dark:border-blue-700', 'bg-blue-50/50', 'dark:bg-blue-900/20');
  
        const selectedBtn = card.querySelector('a.inline-block.w-full');
        if (selectedBtn) {
          selectedBtn.classList.remove('bg-gray-800', 'hover:bg-gray-900', 'dark:bg-neutral-800', 'dark:hover:bg-neutral-700');
          selectedBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }
  
        // Add "Selected" badge if not startup
        if (card !== startupCard) {
          const badgeContainer = document.createElement('p');
          badgeContainer.className = 'mb-3';
          badgeContainer.innerHTML = `
            <span data-selected="true" class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs uppercase font-semibold bg-blue-600 text-white dark:bg-blue-500 dark:text-white">
              Selected
            </span>
          `;
          card.insertBefore(badgeContainer, card.firstChild);
        }
      }
  
      currentlySelectedCard = card;
    }
  
    // Initialize
    updatePrices(pricingSwitch.checked);
    highlightCard(startupCard);
  
    // Pricing switch event
    pricingSwitch?.addEventListener('change', function() {
      updatePrices(this.checked);
    });
  
    // Card click handlers
    [freeCard, startupCard, teamCard, enterpriseCard].forEach(card => {
      if (!card) return;
      card.addEventListener('click', () => highlightCard(card));
      card.style.cursor = 'pointer';
    });
  
    // Hover Effects
    [freeCard, startupCard, teamCard, enterpriseCard].forEach(card => {
      if (!card) return;
      card.addEventListener('mouseenter', () => {
        if (card !== currentlySelectedCard) {
          card.classList.add('shadow-lg', 'border-blue-200', 'dark:border-blue-900');
          card.classList.remove('shadow-2xs');
        }
      });
      card.addEventListener('mouseleave', () => {
        if (card !== currentlySelectedCard) {
          card.classList.remove('shadow-lg', 'border-blue-200', 'dark:border-blue-900');
          card.classList.add('shadow-2xs');
        }
      });
    });
  });
  

document.addEventListener('DOMContentLoaded', function () {
    const accordionToggles = document.querySelectorAll('.hs-accordion-toggle');

    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const expanded = this.getAttribute('aria-expanded') === 'true';

            // Toggle aria-expanded attribute
            this.setAttribute('aria-expanded', !expanded);

            // Slide content up/down
            if (expanded) {
                content.classList.add('hidden');
                content.style.height = 0;
            } else {
                content.classList.remove('hidden');
                content.style.height = content.scrollHeight + 'px';
            }
        });
    });
});
