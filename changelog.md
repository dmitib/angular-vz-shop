# Changelog

## Task 1
* Initial commit for shop project.
* Added CartComponent, CartService, CartModel.
* Added product list component.
* Added 'Add to cart' button to Product component.
* Updated product component with mock data.
* Added product component.

## Task 2
* Added highlight directive and applied it to the products component (@HostBinding, @HostListener).
* Created modules for: Products, Cart, Orders, Core, Shared.
* Divided cart component on cart-list & cart-item.
* Added app title to the AppComponent (@ViewChild).
* Added OnPush change strategy to the ProductComponent.
* Used ngClass for add Class to element.

## Task 3
* Added LocalStorageService and 3 methods (setItem, getItem, removeItem).
* Added ConfigOptionsService and 2 methods (setConfig, getConfig).
* Added ConstantsService and registered using "useValue".
* Added GeneratorService for generating random sequence of symbols (consist from following set: a-z, A-Z, 0-9).
* Added AboutComponent and have been injected services above (LocalStorageService, ConfigOptionsService, ConstantsService, GeneratorService) using "@Optional()".
* Added "change background" directive and applied it to the cart-item component using "ElementRef/Renderer2".

## Task 4
* Applied 4 built-in pipes (currency, date, uppercase, titlecase).
* Changed method getProducts() in ProductService (return Promise), applied async pipe.
* Created OrderByPipe for sorting data in cart
* Registered OrderByPipe in SharedModule.
* Applied implementation of sorting products in cart based on price, sum, name

## Task 5
* Add login component (auth guard)
* Add admin component and protect this area
* Add comments module
* Add manage product
* Add manage products
* Add manage order
* Add manage orders
* Applied localStorage and sync with cart
* Add products detail component
* Add Popup (confirmation) component
