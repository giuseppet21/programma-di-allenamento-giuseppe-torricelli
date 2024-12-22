class MainScreen:
    def __init__(self):
        self.workouts = []
        self.current_user = None
    
    def display_menu(self):
        print("\n=== FITNESS APP ===")
        print("1. Visualizza Profilo")
        print("2. Nuovo Allenamento")
        print("3. Storico Allenamenti")
        print("4. Statistiche")
        print("5. Esci") 