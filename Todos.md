### TODO: User should exist when reload happens
- [x] save it on the cookies
- [x] on load we should load it & dispatch load

### TODO: PRODUCT
- [x] Search & Filters
- [x] Product Details Page & Functionality
- [x] Add to cart funcionality

### TODO: User Cart | Orders | Arrived | Cancelled
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
- [x] When adding to cart, check if the item with the same variant is in the cart
     if so, 
     
        check if the qty of the item already in cart plus the qty of current
        is not greater than the limit stock of the product
       
       |if exceeded 
            then notify you already have this on cart and it will exceed the current stock

       |else 
            add it on cart

    else 
        add it on cart


- [x] User Order Detail View
- [x] Like an item ( add field on user model )
        likes [{ product_ID, product_name, thumb }]
        

### TODO: MAJOR PART SETTINGSS FINAL!!!!!
- [x] Create the page for Settings
- [x] load latest user settings
- [x] change photo is not upload photo only pre created graphics avatar
- [x] emails
- [x] mobile numbers
- [x] add more shipping address




### TODO: ON USER IF MORE TIME LEFT
- [x] Notification Modal
    - [] new field on user -> notifications{ id, title, type, message , link }
- [x]



### TODO: ADMIN
- [x] Admin panel
    - [x] sign in first before loading the system
- [x] Admin nav
    - [x]Quick Insights
        backend
           [x] - total pending
           [x] - completed orders
           [x] - getAll product sort by total earnings                }
    - [x]Product & Tags 
        backend
         ** Product Categories **
           [x] - add categorie model
              {
                  schema_v
                  category_name
                  associated_products[
                      {
                          product_ID,
                          product_name,
                          thumb
                      }
                  ]
                  cat
                  cby
                  uat
                  uby
                  dat
              }
           [x] - getAllCategories
           [x] - searchCategories
           [x] - addCategories

            ** Product Management **

//TODO: Product Page MAJOR
[x] Product page
   [x] - getAllProduct
   [x] - updateProducts
        mode 0 create, 1 update, -1 delete
            

    [x] - pending orders 
        backend 
            ** Pending Orders **
            [x]    - getAllPending
                    if order id provided find specific,
                    if not return all
            [x]    - updatepending
                    mode 0 accept, -1 reject
             NOTE: When the chosen courier is not in courier options, then you cannot accept it anymore 
             NOTE: When accepting, check if the user exist, if not, simply remove the order_in_progress entry & remove from order entry
            
            ** In Progress **
            [x]    - getAllInProgress
                    if order id provided find specific,
                    if not return all
             [x]   - updatepending
                    mode 0 update, mode 1 complete(move to delivered)

            ** Completed Orders **
             [x]   - getAllCompleted
                    if order_id provided find specific
                    if not return all
              [x]  - deleteCompleted
                    if order_id and mode -1 provided
                        then remove specific
                    if not remove all data
                
   [x] - courier options 
       [x] - getAllCourier
       [x] - updateCourier
            mode 0 create, mode 1 update, mode -1 delete

//TODO: Admin Page
    [x]- admins 
       [x] - getAllAdmin
       [x] - updateAdmin
            id
            NOTE: if your role is not root, then you can't 
            mode 0 create, mode 1 update, mode -1 delete(Only Root)
        
//TODO: User Page
   [x] - customers 
        [x]- getUser
          [x]  - if email provided, then return specific
         [x]   - if note return all
     [x]   - updateUser
            NOTE: You can only update password but not the info of the user
            mode 0 create,
            mode 1 update,
            mode -1 






