# parking-checker
## Arduino project with frontend
### Technologies used:
- NextJS framework for frontend
- arduino
### Description
- This project will simply check a parking spot if it's:
    - Free (Green) - corresponding to value 1
    - Occupied (Red) - corresponding to value 2
    - Unknown state (Purple) - corresponding to value 3
- Progress of getting data
    - Arduino -> LoraWAN -> Cloud Server -> API -> NextJS browser Client
    - Each change will take up apx. to 5 seconds.
