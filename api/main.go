package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	fmt.Print("start")

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Get("/games", func(c *fiber.Ctx) error {
		return c.SendString("bulls-suns, lakers-grizzlies")
	})

	log.Fatal(app.Listen(":4000"))
}
