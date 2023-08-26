package main

type Player struct {
}

type Team struct {
}

type User struct {
	Id           int
	Name         string
	PasswordHash []byte
	PasswordSalt []byte
}
