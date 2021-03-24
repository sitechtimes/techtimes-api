# techtimes-api
Typescript-Express API powering the TechTimes website 🚀

## Setup 

1. Clone the repository
```shell script
git clone https://github.com/sitechtimes/techtimes-api
```

2. Create a dotenv file
```dosini
JWT_KEY=[INSERT DEV JWT_KEY HERE]
MONGO_URI=[INSERT DEV MONGO DB HERE]
```

3. Create secret from dotenv flie
```shell script
kubectl create secret generic secrets --from-env-file=[INSERT ENV FILE PATH]
```
