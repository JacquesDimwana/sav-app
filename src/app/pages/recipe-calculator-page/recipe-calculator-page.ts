import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ingredient } from '../../model/ingredient.model';
import { LigneIngredient,Recette } from '../../model/recette.model';
import { RecetteFormDTO } from '../../model/dto.model';
import { IngredientService } from '../../services/ingredient.service';
import { RecetteService } from '../../services/recette.service';

@Component({
  selector: 'app-recipe-calculator-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './recipe-calculator-page.html',
  styleUrl: './recipe-calculator-page.css',
})

export class RecipeCalculatorPage implements OnInit {

  // Liste des ingrédients disponibles :
  public ingredientsDispo: Ingredient[] = [];

  // Ingrédients sélectionnés :
  public choixIngredient: Ingredient | null = null;
  public selectionIngredients: LigneIngredient[] = [];
  public masseTotale = 0;

  // Affichage de la recette après son calcul :
  public recetteAffichee: Recette | null = null;

  // Messages de validation :
  public messageConfirmation: string = '';
  public messageErreur: string = '';

  // Nouvelle recette :
  public nouvelleRecetteDTO: RecetteFormDTO = {
    id: null,
    titre: '',
    description: '',
    surgraissage: 0,
    avecSoude: false,
    concentrationAlcalin: 0,
    ligneIngredients: []
  }

  // Injection des services par le constructeur :
  constructor(
    private ingredientService: IngredientService,
    private recetteService: RecetteService
  ) { }

  // Initialisation : Récupération de la liste des ingrédients via l'API :
  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(data =>
      this.ingredientsDispo = data);
  }

  /**
   * Ajoute une ligne ingrédient à la recette
   */
  ajouterIngredient(): void {
    // Refus des doublons :
    if (this.choixIngredient && this.selectionIngredients.find(l =>
      l.ingredient.id === this.choixIngredient?.id)) {
      return;
    }
    // Ajout de la ligneIngredient :
    this.selectionIngredients.push({
      ingredient: this.choixIngredient!,
      quantite: 0,
      pourcentage: 0
    })
    // Réinitialiser le menu déroulant après l'ajout
    this.choixIngredient = null;
  }

  /**
   * Recalcule les pourcentages
   */
  recalculerPourcentages(): void {
    this.masseTotale = this.selectionIngredients.reduce((acc, ligne) => acc + ligne.quantite, 0);
    this.selectionIngredients.forEach(ligne => {
      ligne.pourcentage = this.masseTotale > 0 ? +(ligne.quantite / this.masseTotale * 100).toFixed(0) : 0;
    });
  }

  /**
   * Supprime un ingrédient préalablement choisi pour la recette en cours
   * @param index
   */
  supprimerIngredient(index: number): void {
    this.selectionIngredients.splice(index, 1);
  }

  /**
 * Réinitialise le formulaire pour une nouvelle recette
 */
nouvelleRecette(): void {
  this.nouvelleRecetteDTO = {
    id: null,
    titre: '',
    description: '',
    surgraissage: 0,
    avecSoude: false,
    concentrationAlcalin: 0,
    ligneIngredients: []
  };
  this.selectionIngredients = [];
  this.masseTotale = 0;
  this.choixIngredient = null;
  this.recetteAffichee = null;
  this.messageConfirmation = '';
  this.messageErreur = '';
}

  /**
   * Méthode de soumission de la nouvelle recette
   */
  onSubmit(): void {
    // Réinitialisation des messages :
    this.messageConfirmation = '';
    this.messageErreur = '';
    this.recetteAffichee = null;

    // --- VALIDATION ---

    // 1. Vérifier que la recette a un titre :
    if (!this.nouvelleRecetteDTO.titre.trim()) {
      this.messageErreur = 'Le titre de la recette est obligatoire.';
      return;
    }

    // 2. Vérifier qu'au moins un ingrédient est sélectionné :
    if (this.selectionIngredients.length === 0) {
      this.messageErreur = 'Veuillez ajouter au moins un ingrédient.';
      return;
    }

    // 3. Vérifier que toutes les quantités sont > 0 :
    const ingredientSansQuantite = this.selectionIngredients.find(l => l.quantite <= 0);
    if (ingredientSansQuantite) {
      this.messageErreur = `La quantité de "${ingredientSansQuantite.ingredient.nom}" doit être supérieure à 0.`;
      return;
    }

    // --- ENVOI ---

    // 1. Associer les ingrédients à ligneIngredientDTO :
    const ligneIngredientDTOs = this.selectionIngredients.map(ligne => ({
      quantite: ligne.quantite,
      pourcentage: ligne.pourcentage,
      ingredientId: ligne.ingredient?.id ?? 0
    }));

    // 2. Finalisation de l'objet RecetteFormDTO :
    const recetteEnvoyee: RecetteFormDTO = {
      ...this.nouvelleRecetteDTO,
      ligneIngredients: ligneIngredientDTOs
    };

    // 3. Envoi de la recette à l'API via le service recette :
    this.recetteService.createRecette(recetteEnvoyee).subscribe({
      next: (recette: Recette) => {
        this.recetteAffichee = recette; // On récupère la recette avec les scores
        this.messageConfirmation = `Recette "${recette.titre}" calculée et enregistrée avec succès !`;
        alert("Recette calculée et enregistrée avec succès !");
        console.log('Recette reçue du backend :', recette);
      },
      error: (err) => {
        this.messageErreur = 'Erreur lors du calcul. Vérifier vos données.';
        alert("Erreur lors du calcul. Vérifier vos données.");
        console.error('Erreur lors de la création de la recette :', err);
      }
    });
  }
}