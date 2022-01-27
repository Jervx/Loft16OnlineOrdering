### TODO: User should exist when reload happens
- [x] save it on the cookies
- [x] on load we should load it & dispatch load

### TODO: PRODUCT
- [x] Search & Filters
- [x] Product Details Page & Functionality
- [doing] Add to cart funcionality

### TODO: User Cart
- [x] should request the data from backend
- [x] mycart
- [x] mycart item view
- [x] delete item & add item logic should be in front end (Usually cancellation of order)
      & will only sent the full cart object to the server
- [x] Create a modal for checkout
- [x] Create model for pending order
- [x] On Checkout Create record in Orders collection & pending orders collection
- [x] Orders Tab Page
- [x] removable order if not yet accepted by admin
- [x] Cancelled Orders
- [x] Arrived Orders
- [x] deletable record in Arrived & Cancelled

### TODO: LAST THING ON CARTS 
- [] When adding to cart, check if the item with the same variant is in the cart
     if so, 
     
        check if the qty of the item already in cart plus the qty of current
        is not greater than the limit stock of the product
       
       |if exceeded 
            then notify you already have this on cart and it will exceed the current stock

       |else 
            add it on cart

    else 
        add it on cart

        

### TODO: MAJOR PART SETTINGSS FINAL!!!!!
- [] Create the page for Settings
- [] load latest user settings
- [] change photo is not upload photo only pre created graphics
- [] save photo
- [] can't change email, only add
- [] can add more mobile number
- [] add more shipping address

### TODO: User Cart BACKEND
- [ ] when requesting the user cart, sync realtime data of products on cart to prevent price, name, variant, & photo difference 
- [ ] set cart as full

### TODO: User Orders BACKEND
- [ ] get record from pending & in progress
- [ ] delete request 1 item (Usually cancellation of order)

### TODO: User Arrived BACKEND
- [ ] get record from completed_orders collection
- [ ] delete a record










