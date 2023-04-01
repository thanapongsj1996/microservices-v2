package main

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"thanapong.com/order-service/db"
	"thanapong.com/order-service/models"
	"thanapong.com/order-service/routes"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		panic(err)
	}

	gin.SetMode(os.Getenv("GIN_MODE"))

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"*"},
		AllowCredentials: true,
	}))

	apiV1Route := r.Group("/api/v1")

	db.ConnectDB()
	DB := db.GetDB()
	defer db.CloseDB()

	DB.AutoMigrate(&models.Order{})

	routes.InitHomeRoute(apiV1Route)
	routes.InitOrderRoute(apiV1Route, DB)

	r.Run(":" + os.Getenv("PORT")) // listen and serve on 0.0.0.0:8080

}
