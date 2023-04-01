package db

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func ConnectDB() {
	dbDNS := os.Getenv("DB_URL")

	var err error
	db, err = gorm.Open(postgres.Open(dbDNS), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	fmt.Println("conected")
}

func GetDB() *gorm.DB {
	return db
}

func CloseDB() {
	_db, err := db.DB()
	if err != nil {
		panic(err)
	}

	_db.Close()
}
