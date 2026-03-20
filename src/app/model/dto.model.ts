import { LigneIngredient, Resultat } from "./recette.model";

/**
* Structure simplifiée envoyée au serveur lors d'une sauvegarde (POST ou PUT).
*/
export interface RecetteFormDTO {
    /** * L'ID est optionnel (?) car lors de la création d'une nouvelle recette,
    * c'est le serveur qui va générer cet identifiant unique.
    */
    id?: number | null;
    titre: string;
    description: string;
    surgraissage: number;
    avecSoude: boolean;
    concentrationAlcalin: number;
    ligneIngredients: any[];
}
export interface Recette {
    id: number;
    titre: string;
    description: string;
    surgraissage: number;
    apportEnEau: number;
    avecSoude: boolean;
    concentrationAlcalin: number; // Rajouter un 'n' à la fin
    qteAlcalin: number; // Rajouter un 'n' à la fin
    ligneIngredients: LigneIngredient[];
    resultats: Resultat[];
}