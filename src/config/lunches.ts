import { ClassIDS } from '../types';
import * as types from '../types/lunchesTypes';
import { teachers } from './teachers';

// I just realized this will have to be updated each term ... grrr gotta implement that
export const lunches: types.LunchesType = {
    0: [
        {
            basedOnPeriod: 3,
            lunches: [
                {
                    lunch: 1,
                    teachers: [
                        teachers.Blake_Ashley_L,
                        teachers.Bland_James_W,
                        teachers.Brendible_Jacklyn_V,
                        teachers.Brokaw_David_C,
                        teachers.Fowler_Ethan_T,
                        teachers.Frady_Sadie_L,
                        teachers.Gibbs_Denise_R,
                        teachers.Hamilton_Michelle_Y,
                        teachers.Loiselle_Ryan_A,
                        teachers.Metcalf_Cody_D,
                        teachers.Morrison_Jennifer_M,
                        teachers.Pelandini_Rebecca_M,
                        teachers.Pike_Stephanie_R,
                        teachers.Sacks_Michael_J,
                        teachers.Shinnick_Nelson_N,
                        teachers.Southworth_Gregory_W,
                        teachers.Talen_Michael_H,
                        teachers.Vallier_Heather_M,
                        teachers.Welborn_Scott_T,
                        teachers.Olsen_Carolyn_E,
                    ],
                },
                {
                    lunch: 2,
                    teachers: [
                        teachers.Barnette_Carlotta_A,
                        teachers.Beatty_Matthew,
                        teachers.Benson_Katherine_E,
                        teachers.Bridgman_Jonathan_I,
                        teachers.Cain_Brandon_M,
                        teachers.Calos_Brandon_N,
                        teachers.Cambra_Christine_A,
                        teachers.Carrell_Jason_D,
                        teachers.Gladfelter_Irl_A,
                        // Removed teachers.Grimaldi_Marseille,
                        teachers.Iverson_Kenneth_B,
                        teachers.Morford_Tressa_K,
                        teachers.Racus_Britni_E,
                        teachers.Reisch_Rebecca_D,
                        teachers.Saffle_Teal_H,
                        teachers.Stickney_Christopher_L,
                        teachers.Angotti_Rachel_A,
                        teachers.Taylor_Claire_V,
                        teachers.Ito_Megumi,
                        teachers.Wolff_Laural_A,
                        teachers.Wilson_Anne_M,
                        teachers.Wood_Julana_M,
                    ],
                },
                {
                    lunch: 3,
                    teachers: [
                        teachers.Adams_Jennifer_N,
                        teachers.Allen_David_M,
                        teachers.Doyle_Suzanne_M,
                        teachers.Gardner_Kenneth_A,
                        teachers.Greenland_Roy_F,
                        teachers.Haegele_Dennis_S,
                        teachers.Hodges_Denise_L,
                        teachers.Jolly_Morgan_D,
                        teachers.Kennedy_lindsay_Jordann_A,
                        teachers.Knox_Caleb_M,
                        teachers.Misley_Philip_J,
                        teachers.Fowler_Raylene_K,
                        teachers.Rath_Patricia_E,
                        teachers.Ridgway_Thomas_G,
                        teachers.Riggle_Brian,
                        teachers.Roberts_Lori_C,
                        teachers.Sauer_Kyle_D,
                        teachers.Schreiber_Nathan_A,
                        teachers.Schwoch_Kevin_R,
                        teachers.Shelley_Bonnie_R,
                        teachers.Shoot_Andrew_L,
                        teachers.Stumpf_John_R,
                        teachers.Thorn_Danielle_E,
                        teachers.Whitehead_Ryan_D,
                    ],
                },
            ],
        },
        {
            // cringe
            forOveride: true,
            basedOnPeriod: 0,
            // When lunch is based on advisory for this term, why...
            basedOnPeriodID: ClassIDS.Advisory,
            lunches: [
                {
                    lunch: 1,
                    teachers: [
                        teachers.Fowler_Ethan_T,
                        // Removed teachers.Grimaldi_Marseille,
                        teachers.Hodges_Denise_L,
                        teachers.Beatty_Matthew,
                        teachers.Mcmullen_Michael_L,
                        teachers.Partin_Mariah_F,
                        teachers.Reisch_Rebecca_D,
                        teachers.Welborn_Scott_T,
                        teachers.Wilson_Anne_M,
                    ],
                },
                {
                    lunch: 3,
                    teachers: [
                        teachers.Bland_James_W,
                        teachers.Doyle_Suzanne_M,
                        teachers.Gardner_Kenneth_A,
                        teachers.Greenland_Roy_F,
                        teachers.Haegele_Dennis_S,
                        teachers.Hilsabeck_Erika_M,
                        teachers.Rath_Patricia_E,
                        teachers.Sauer_Kyle_D,
                        teachers.Southworth_Gregory_W,
                        teachers.Whitehead_Ryan_D,
                        teachers.Wiggins_Malissa_J,
                    ],
                },
            ],
        },
    ],
    1: [
        {
            basedOnPeriod: 3,
            lunches: [
                {
                    lunch: 1,
                    teachers: [
                        teachers.Blake_Ashley_L,
                        teachers.Brendible_Jacklyn_V,
                        teachers.Brokaw_David_C,
                        teachers.Fowler_Ethan_T,
                        teachers.Fowler_Raylene_K,
                        teachers.Frady_Sadie_L,
                        teachers.Gibbs_Denise_R,
                        teachers.Haegele_Dennis_S,
                        // teachers.Hamilton_Michelle_Y,
                        teachers.Loiselle_Ryan_A,
                        teachers.Morrison_Jennifer_M,
                        teachers.Pelandini_Rebecca_M,
                        teachers.Pike_Stephanie_R,
                        teachers.Racus_Britni_E,
                        teachers.Riggle_Brian,
                        teachers.Roberts_Lori_C,
                        teachers.Sacks_Michael_J,
                        teachers.Shinnick_Nelson_N,
                        teachers.Baker_Chelsea_C, // TBD
                        // teachers.Southworth_Gregory_W,
                        // teachers.Talen_Michael_H,
                        teachers.Vallier_Heather_M,
                        teachers.Welborn_Scott_T,
                        teachers.Olsen_Carolyn_E,
                    ],
                },
                {
                    lunch: 2,
                    teachers: [
                        teachers.Adams_Jennifer_N,
                        teachers.Angotti_Rachel_A,
                        teachers.Barnette_Carlotta_A,
                        // teachers.Beatty_Matthew,
                        teachers.Benson_Katherine_E,
                        teachers.Cain_Brandon_M,
                        teachers.Calos_Brandon_N,
                        teachers.Cambra_Christine_A,
                        teachers.Carrell_Jason_D,
                        teachers.Gladfelter_Irl_A,
                        // Removed teachers.Grimaldi_Marseille,
                        teachers.Jolly_Morgan_D,
                        teachers.Metcalf_Cody_D,
                        // teachers.Iverson_Kenneth_B,
                        // teachers.Morford_Tressa_K,
                        teachers.Reisch_Rebecca_D,
                        // teachers.Saffle_Teal_H,
                        // teachers.Stickney_Christopher_L,
                        teachers.Taylor_Claire_V,
                        teachers.Wiggins_Malissa_J, // TBD
                        // teachers.Ito_Megumi,
                        // teachers.Wolff_Laural_A,
                        teachers.Wilson_Anne_M,
                        teachers.Wood_Julana_M,
                    ],
                },
                {
                    lunch: 3,
                    teachers: [
                        teachers.Allen_David_M,
                        teachers.Bland_James_W,
                        teachers.Bridgman_Jonathan_I,
                        teachers.Doyle_Suzanne_M,
                        teachers.Gardner_Kenneth_A,
                        teachers.Greenland_Roy_F,

                        // teachers.Hodges_Denise_L,

                        teachers.Kennedy_lindsay_Jordann_A,
                        // teachers.Knox_Caleb_M,
                        teachers.Misley_Philip_J,
                        // teachers.Fowler_Raylene_K,
                        teachers.Rath_Patricia_E,
                        teachers.Ridgway_Thomas_G,
                        teachers.Saffle_Teal_H,

                        teachers.Sauer_Kyle_D,
                        teachers.Schreiber_Nathan_A,
                        teachers.Schwoch_Kevin_R,
                        teachers.Shelley_Bonnie_R,
                        // teachers.Shoot_Andrew_L,
                        teachers.Stumpf_John_R,
                        teachers.Talen_Michael_H,
                        teachers.Wolff_Laural_A, // TBD
                        teachers.Thorn_Danielle_E,
                        teachers.Whitehead_Ryan_D,
                    ],
                },
            ],
        },
        {
            forOveride: true,
            basedOnPeriod: 4,
            basedOnPeriodID: ClassIDS.Period,
            lunches: [
                {
                    lunch: 1,
                    teachers: [
                        // Removed teachers.Athow_Michael_J,
                        teachers.Brendible_Jacklyn_V,
                        teachers.Brokaw_David_C,
                        teachers.Estrada_Jennifer_B,
                        teachers.Frady_Sadie_L,
                        teachers.Gibbs_Denise_R,
                        teachers.Haegele_Dennis_S,
                        teachers.Hodges_Denise_L,
                        teachers.Jin_Heather_A,
                        teachers.Knox_Caleb_M,
                        teachers.Morrison_Jennifer_M,

                        // Theres two
                        teachers.Olsen_Carolyn_E,
                        // Removed teachers.Olson_Howard_Diane_L,

                        teachers.Parsons_Terri_L,
                        teachers.Partin_Mariah_F,
                        teachers.Pelandini_Rebecca_M,
                        teachers.Racus_Britni_E,
                        teachers.Rexus_Daniel_R,
                        teachers.Scheirer_Nep_K,
                        teachers.Shinnick_Nelson_N,
                        teachers.Shoot_Andrew_L,
                        teachers.Soriero_Sabrina_L,
                        teachers.Vallier_Heather_M,
                    ],
                },
                {
                    lunch: 2,
                    teachers: [
                        teachers.Angotti_Rachel_A,
                        teachers.Barnette_Carlotta_A,
                        teachers.Beatty_Matthew,
                        teachers.Benson_Katherine_E,
                        teachers.Cain_Brandon_M,
                        teachers.Calos_Brandon_N,
                        teachers.Cambra_Christine_A,
                        teachers.Carrell_Jason_D,
                        teachers.Fernandez_Zesty_A,
                        teachers.Forse_Lita_L,

                        // Which one?
                        teachers.Fowler_Ethan_T,
                        teachers.Fowler_Krystall,
                        teachers.Fowler_Raylene_K,

                        teachers.Gladfelter_Irl_A,
                        // Removed teachers.Grimaldi_Marseille,
                        teachers.Hilsabeck_Erika_M,
                        teachers.Iverson_Kenneth_B,
                        teachers.Jolly_Morgan_D,
                        teachers.Mcmullen_Michael_L,
                        teachers.Metcalf_Cody_D,
                        teachers.Reisch_Rebecca_D,
                        teachers.Rodriguez_Christy_L,
                        teachers.Stickney_Christopher_L,
                        teachers.Taylor_Claire_V,
                        teachers.Watson_Hayley_J,
                        teachers.Wiggins_Malissa_J,
                    ],
                },
                {
                    lunch: 3,
                    teachers: [
                        teachers.Allen_David_M,
                        teachers.Bland_James_W,
                        teachers.Chege_Mary_W,
                        teachers.Hamilton_Michelle_Y,
                        teachers.Kennedy_lindsay_Jordann_A,
                        teachers.Matthews_Tyler_M,
                        teachers.Misley_Philip_J,
                        teachers.Rath_Patricia_E,
                        teachers.Ridgway_Thomas_G,
                        teachers.Riggle_Brian,
                        teachers.Sauer_Kyle_D,
                        teachers.Schreiber_Nathan_A,
                        teachers.Schwoch_Kevin_R,
                        teachers.Shelley_Bonnie_R,
                        teachers.Southworth_Gregory_W,
                        teachers.Stumpf_John_R,
                        teachers.Whitehead_Ryan_D,
                    ],
                },
            ],
        },
        {
            // For BHM Assembly
            forOveride: true,
            basedOnPeriod: 4,
            basedOnPeriodID: ClassIDS.Period,
            id: 'BHM',
            lunches: [
                {
                    lunch: 1,
                    teachers: [
                        // Removed teachers.Athow_Michael_J,
                        teachers.Brendible_Jacklyn_V,
                        teachers.Brokaw_David_C,
                        teachers.Estrada_Jennifer_B,
                        teachers.Frady_Sadie_L,
                        teachers.Gibbs_Denise_R,
                        teachers.Haegele_Dennis_S,
                        teachers.Hodges_Denise_L,
                        teachers.Jin_Heather_A,
                        teachers.Knox_Caleb_M,
                        teachers.Morrison_Jennifer_M,

                        // Theres two
                        teachers.Olsen_Carolyn_E,
                        // Removed teachers.Olson_Howard_Diane_L,

                        teachers.Parsons_Terri_L,
                        teachers.Partin_Mariah_F,
                        teachers.Pelandini_Rebecca_M,
                        teachers.Racus_Britni_E,
                        teachers.Rexus_Daniel_R,
                        teachers.Scheirer_Nep_K,
                        teachers.Shinnick_Nelson_N,
                        teachers.Shoot_Andrew_L,
                        teachers.Southworth_Gregory_W,
                    ],
                },
                {
                    lunch: 2,
                    teachers: [
                        teachers.Angotti_Rachel_A,
                        teachers.Barnette_Carlotta_A,
                        teachers.Beatty_Matthew,
                        teachers.Benson_Katherine_E,
                        teachers.Cain_Brandon_M,
                        teachers.Calos_Brandon_N,
                        teachers.Cambra_Christine_A,
                        teachers.Carrell_Jason_D,
                        teachers.Fernandez_Zesty_A,
                        teachers.Forse_Lita_L,

                        // Which one?
                        teachers.Fowler_Ethan_T,
                        teachers.Fowler_Krystall,
                        teachers.Fowler_Raylene_K,

                        teachers.Gladfelter_Irl_A,
                        // Removed teachers.Grimaldi_Marseille,
                        teachers.Hilsabeck_Erika_M,
                        teachers.Iverson_Kenneth_B,
                        teachers.Jolly_Morgan_D,
                        teachers.Mcmullen_Michael_L,
                        teachers.Metcalf_Cody_D,
                        teachers.Reisch_Rebecca_D,
                        teachers.Rodriguez_Christy_L,
                        teachers.Stickney_Christopher_L,
                        teachers.Taylor_Claire_V,
                        teachers.Watson_Hayley_J,
                        teachers.Wiggins_Malissa_J,
                    ],
                },
                {
                    lunch: 3,
                    teachers: [
                        teachers.Allen_David_M,
                        teachers.Bland_James_W,
                        teachers.Chege_Mary_W,
                        teachers.Hamilton_Michelle_Y,
                        teachers.Kennedy_lindsay_Jordann_A,
                        teachers.Matthews_Tyler_M,
                        teachers.Misley_Philip_J,
                        teachers.Rath_Patricia_E,
                        teachers.Ridgway_Thomas_G,
                        teachers.Riggle_Brian,
                        teachers.Sauer_Kyle_D,
                        teachers.Schreiber_Nathan_A,
                        teachers.Schwoch_Kevin_R,
                        teachers.Shelley_Bonnie_R,
                        teachers.Soriero_Sabrina_L,
                        teachers.Stumpf_John_R,
                        teachers.Whitehead_Ryan_D,
                        teachers.Vallier_Heather_M,
                    ],
                },
            ],
        },
    ],
    2: [
        {
            basedOnPeriod: 3,
            lunches: [
                {
                    lunch: 1,
                    teachers: [
                        teachers.Adams_Jennifer_N,
                        // Removed teachers.Athow_Michael_J,
                        teachers.Blake_Ashley_L,
                        teachers.Brendible_Jacklyn_V,
                        teachers.Brokaw_David_C,
                        teachers.Fowler_Ethan_T,
                        teachers.Fowler_Raylene_K,
                        teachers.Frady_Sadie_L,
                        teachers.Gibbs_Denise_R,
                        teachers.Loiselle_Ryan_A,
                        teachers.Mooy_Michelle_L,
                        teachers.Morrison_Jennifer_M,
                        teachers.Olsen_Carolyn_E,
                        teachers.Pelandini_Rebecca_M,
                        teachers.Pike_Stephanie_R,
                        teachers.Sacks_Michael_J,
                        teachers.Soriero_Sabrina_L,
                        teachers.Vallier_Heather_M,
                        teachers.Welborn_Scott_T,
                    ],
                },
                {
                    lunch: 2,
                    teachers: [
                        teachers.Angotti_Rachel_A,
                        teachers.Barnette_Carlotta_A,
                        teachers.Benson_Katherine_E,
                        teachers.Bland_James_W,
                        teachers.Bridgman_Jonathan_I,
                        teachers.Cain_Brandon_M,
                        teachers.Calos_Brandon_N,
                        teachers.Cambra_Christine_A,
                        teachers.Chege_Mary_W,
                        teachers.Gardner_Kenneth_A,
                        teachers.Gladfelter_Irl_A,
                        teachers.Hammond_Marseille,
                        teachers.Jin_Heather_A,
                        teachers.Jolly_Morgan_D,
                        teachers.Matthews_Tyler_M,
                        teachers.Reisch_Rebecca_D,
                        teachers.Stumpf_John_R,
                        teachers.Taylor_Claire_V,
                        teachers.Wilson_Anne_M,
                        teachers.Wood_Julana_M,
                    ],
                },
                {
                    lunch: 3,
                    teachers: [
                        teachers.Allen_David_M,
                        teachers.Doyle_Suzanne_M,
                        teachers.Greenland_Roy_F,
                        teachers.Haegele_Dennis_S,
                        teachers.Hodges_Denise_L,
                        teachers.Metcalf_Cody_D,
                        teachers.Misley_Philip_J,
                        teachers.Racus_Britni_E,
                        teachers.Riggle_Brian,
                        teachers.Roberts_Lori_C,
                        teachers.Saffle_Teal_H,
                        teachers.Sauer_Kyle_D,
                        teachers.Schreiber_Nathan_A,
                        teachers.Shinnick_Nelson_N,
                        teachers.Shoot_Andrew_L,
                        teachers.Southworth_Gregory_W,
                        teachers.Talen_Michael_H,
                        teachers.Thorn_Danielle_E,
                        teachers.Whitehead_Ryan_D,
                    ],
                },
            ],
        },
    ],
};
