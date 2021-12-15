### TODO: User should exist when reload happens
- [x] save it on the cookies
- [x] on load we should load it & dispatch load

### TODO: PRODUCT
- [ ] Search & Filters
- [ ] Product Details Page & Functionality

### TODO: User Cart
- [x] should request the data from backend
- [x] mycart 
- [ ] delete item & add item logic should be in front end (Usually cancellation of order)
      & will only sent the full cart object to the server
- [ ] On Checkout Create record in Orders collection & pending orders collection

### TODO: ORDER, ARRIVED, Cancelled
- [ ] removable order if not yet accepted by admin
- [ ] deletable record in Arrived & Cancelled

### TODO: User Cart BACKEND
- [ ] when requesting the user cart, sync realtime data of products on cart to prevent price, name, variant, & photo difference 
- [ ] set cart as full

### TODO: User Orders BACKEND
- [ ] get record from pending & in progress
- [ ] delete request 1 item (Usually cancellation of order)

### TODO: User Arrived BACKEND
- [ ] get record from completed_orders collection
- [ ] delete a record