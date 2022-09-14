import * as types from "../types/lunchesTypes";
import { teachers } from "./teachers";

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

                        // I was not given a lunch for the following, and ones that are not on the 'teachers' value are not in the staff list for some reason
                        // Probably teachers from other schools, grr
                        
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
                        teachers.Grimaldi_Marseille,
                        teachers.Iverson_Kenneth_B,
                        teachers.Morford_Tressa_K,
                        teachers.Racus_Britni_E,
                        teachers.Reisch_Rebecca_D,
                        teachers.Saffle_Teal_H,
                        teachers.Stickney_Christopher_L,
                        teachers.Strom_Rachel_A,
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
            basedOnPeriod: 4,
            lunches: [
                {
                    lunch: 1,
                    teachers: [],
                },
            ],
        },
    ],
    1: [],
    2: [],
};
