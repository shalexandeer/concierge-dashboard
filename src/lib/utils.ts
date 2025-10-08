import { PartnerLocation } from "@/services/partner/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStringLocation(location: PartnerLocation) {
  return `${location.village_name}, ${location.district_name}, ${location.regency_name}, ${location.province_name}`;
}

export function convertToKg(value: number, unit: string = "kg"): number | never {
  if (isNaN(value)) return 0;

  const normalizedUnit = unit.toLowerCase();

  switch (normalizedUnit) {
    // Metric
    case "megagram":
      return value * 1000;
    case "kilogram":
    case "kg":
      return value;
    case "hektogram":
    case "hg":
      return value / 10;
    case "dekagram":
    case "dag":
      return value / 100;
    case "gram":
    case "g":
      return value / 1000;
    case "desigram":
    case "dg":
      return value / 10000;
    case "sentigram":
    case "cg":
      return value / 100000;
    case "miligram":
    case "mg":
      return value / 1000000;
    case "mikrogram":
    case "μg":
    case "ug":
      return value / 1000000000;
    case "nanogram":
    case "ng":
      return value / 1000000000000;
    case "ton":
    case "ton metrik":
    case "t":
      return value * 1000;
    case "kiloton":
    case "kt":
      return value * 1000000;
    case "megaton":
    case "mt":
      return value * 1000000000;
    case "kuintal":
    case "q":
      return value * 100;

    // Imperial/US
    case "pound":
    case "lb":
    case "pon":
      return value / 2.20462;
    case "ounce":
    case "oz":
    case "ons":
      return value / 35.274;
    case "stone":
    case "st":
      return value / 0.157473;
    case "dram":
    case "dr":
      return value / 564.383;
    case "grain":
    case "gr":
      return value / 15432.4;
    case "short ton":
    case "ton pendek":
      return value / 0.00110231;
    case "long ton":
    case "ton panjang":
      return value / 0.000984207;
    case "hundredweight us":
    case "cwt us":
      return value / 0.0220462;
    case "hundredweight imperial":
    case "cwt imperial":
      return value / 0.0196841;

    // Traditional/Regional
    case "pikul":
      return value * 60.48;
    case "kati":
    case "jin":
      return value * 0.5;
    case "tahil":
    case "tael":
      return value * 0.0378;
    case "karat":
    case "ct":
      return value / 5000;
    case "masha":
      return value / 972;
    case "tola":
      return value / 85.7;
    case "seer":
      return value / 0.933;

    // Volume - metric
    case "kiloliter":
    case "kl":
      return value * 1000;
    case "hektoliter":
    case "hl":
      return value * 100;
    case "dekaliter":
    case "dal":
      return value * 10;
    case "liter":
    case "l":
      return value;
    case "desiliter":
    case "dl":
      return value * 0.1;
    case "sentiliter":
    case "cl":
      return value * 0.01;
    case "mililiter":
    case "ml":
      return value * 0.001;
    case "meter kubik":
    case "m³":
    case "m3":
      return value * 1000;
    case "desimeter kubik":
    case "dm³":
    case "dm3":
      return value;
    case "sentimeter kubik":
    case "cm³":
    case "cm3":
    case "cc":
      return value * 0.001;
    case "milimeter kubik":
    case "mm³":
    case "mm3":
      return value * 0.000001;

    // Volume - imperial
    case "galon as":
    case "us gallon":
      return value * 3.79;
    case "galon imperial":
    case "imperial gallon":
      return value * 4.55;
    case "kuart as":
    case "us quart":
      return value * 0.95;
    case "kuart imperial":
    case "imperial quart":
      return value * 1.14;
    case "pint as":
    case "us pint":
      return value * 0.47;
    case "pint imperial":
    case "imperial pint":
      return value * 0.57;
    case "cup":
    case "gelas ukur":
      return value * 0.24;
    case "fluid ounce as":
    case "us fl oz":
      return value * 0.03;
    case "fluid ounce imperial":
    case "imperial fl oz":
      return value * 0.028;
    case "kaki kubik":
    case "cubic foot":
    case "cu ft":
      return value * 28.32;
    case "inci kubik":
    case "cubic inch":
    case "cu in":
      return value * 0.016;
    case "yard kubik":
    case "cubic yard":
    case "cu yd":
      return value * 764.6;

    // Liquid densities
    case "liter minyak goreng":
      return value * 0.92;
    case "liter bensin":
      return value * 0.75;
    case "liter etanol":
      return value * 0.79;
    case "liter merkuri":
      return value * 13.6;
    case "liter susu":
      return value * 1.03;
    case "liter madu":
      return value * 1.4;
    case "liter aseton":
      return value * 0.79;
    case "liter gliserin":
      return value * 1.26;
    case "liter asam sulfat":
      return value * 1.84;
    case "liter alkohol isopropil":
      return value * 0.78;

    default:
      return value; // Return the original value if unit is not recognized
  }
}
