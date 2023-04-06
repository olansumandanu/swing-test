# swing-test

Databases:

# store

-   id [uuid | integer]
-   name [string]
-   url [string]
-   address [string]
-   phone [string]
-   operational_time_start [number]
-   operational_time_end [number]

# products

-   id [uuid | integer]
-   title [string]
-   url [string]
-   price [float]
-   description [text]
-   store_id [uuid | integer] // relation of store table
    Expectation:
-   create api with this database using Typescript or Golang
-   create advance filter from product table
    -- price [asc|desc]
    -- name [asc|desc]
    -- search by name

# Assessment:

-   Quality code
-   Code tidiness
-   Logic handling

# Push your product in your github repository and send to email: ari.getswing.app
