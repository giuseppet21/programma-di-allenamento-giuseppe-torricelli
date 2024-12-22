class User:
    def __init__(self, id, name, email, weight, height, fitness_level):
        self.id = id
        self.name = name
        self.email = email
        self.weight = weight
        self.height = height
        self.fitness_level = fitness_level
        
    def calculate_bmi(self):
        return self.weight / ((self.height/100) ** 2) 