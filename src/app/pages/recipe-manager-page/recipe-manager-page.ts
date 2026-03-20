import { Component, OnInit } from '@angular/core';
import { Recette } from '../../model/recette.model';
import { RecetteService } from '../../services/recette.service';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js/auto';

// Enregistrement des composants Chart.js :
Chart.register(...registerables);

@Component({
  selector: 'app-recipe-manager-page',
  imports: [CommonModule],
  templateUrl: './recipe-manager-page.html',
  styleUrl: './recipe-manager-page.css',
})
export class RecipeManagerPage implements OnInit {

  public recettes: Recette[] = [];

  // Recette sélectionnée pour la modale :
  public recetteSelectionnee: Recette | null = null;

  constructor(private recetteService: RecetteService) {}

  ngOnInit(): void {
    this.chargerRecettes();
  }

  /**
   * Charge les recettes et initialise les graphiques
   */
  chargerRecettes(): void {
    this.recetteService.getRecettes().subscribe(data => {
      this.recettes = data;
      // On attend un court instant que le DOM se mette à jour avec le @for
      setTimeout(() => {
        this.recettes.forEach(r => this.initChart(r));
      }, 100);
    });
  }

  /**
   * Crée le graphique Radar pour une recette spécifique
   */
  initChart(recette: Recette): void {
    const ctx = document.getElementById(`chart-${recette.id}`) as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: recette.resultats.map(res => res.caracteristique.nom),
        datasets: [{
          label: 'Scores',
          data: recette.resultats.map(res => res.score),
          fill: true,
          backgroundColor: 'rgba(210, 0, 255, 0.2)',
          borderColor: 'rgb(210, 0, 255)',
          pointBackgroundColor: 'rgb(0, 180, 0)',
          pointBorderColor: 'rgb(0, 180, 0)',
          pointHoverBackgroundColor: 'rgb(255, 255, 255)',
          pointHoverBorderColor: 'rgb(0, 180, 0)'
        }]
      },
      options: {
        elements: { line: { borderWidth: 2 } },
        scales: {
          r: { suggestedMin: 0, suggestedMax: 100, ticks: { stepSize: 10 } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  /**
   * Définit la recette sélectionnée pour l'affichage des détails
   */
  ouvrirModale(recette: Recette): void {
    this.recetteSelectionnee = recette;
  }

  /**
   * Réinitialise la sélection à la fermeture
   */
  fermerModale(): void {
    this.recetteSelectionnee = null;
  }

  /**
   * Supprime une recette après confirmation
   */
  supprimerRecette(id: number): void {
    if (window.confirm("Supprimer cette recette ?")) {
      this.recetteService.deletteRecette(id).subscribe(() =>
        this.chargerRecettes());
    }
  }
}