import { expect, Locator, TestInfo, BrowserContext } from '@playwright/test';
import { BasePage } from './basePage';
import { config } from '../tests/config';

interface CO2Values {
  co2?: string;
  h2?: string;
  ch4?: string;
  inerts?: string;
  o2?: string;
  n2?: string;
}

interface Contaminant {
  o2?: string;
  nh3?: string;
  s8?: string;
  hcn?: string;
  mx?: string;
  AsH3?: string;
  PH3?: string;
  HeavyMetals?: string;
  FECO5?: string;
  NICO4?: string;
  Tars?: string;
  Particulates?: string;
}

interface ISBL {
  tempretureNormal?: string;
  tempretureDesign?: string;
  tempretureUnit?: string;
  pressureNormal?: string;
  pressureTempreture?: string;
  pressureUnit?: string;
  flowrate?: string;
}

export class FTPage extends BasePage {

  //login page
  txtUsername = 'input[id="signInName"]';
  txtPassword = 'input[id="password"]';

  btnContinue = 'button[id="continue"]';
  btnLogin = 'button[id="next"]';

  //NotifyJM
  buttonNotifyJM = 'div.Header_actionBar__Dd3Hv > div > button';

  //Notification
  buttonSendNotification = '#modal-description > div > button';
  notificationMsgBox = '#modal-description';
  buttonCloseNotification = '#modal-description > button > svg[data-testid="CloseIcon"]';

  //Common Elements
  saveStatus = '#js-portlet-_lchdatacapture_INSTANCE_r2pdleH9exJo_';

  //Main page header
  logoJM = '#Johnson_Matthey_Logo_Blue_';

  //Cost Data
  costDataCurrencyGBP = 'input[name="fieldset-costData.currency"][value="GBP"]';
  costDataCurrencyUSD = 'input[name="fieldset-costData.currency"][value="USD"]';
  costDataCurrencyEUR = 'input[name="fieldset-costData.currency"][value="EUR"]';
  costDataFinalProductValueTxt = 'input#costData\\.finalProductValue';
  costDataFinalProductValueUnit = '#costData\\.finalProductValue_select';
  costDataBiomassFeedstockPriceTxt = 'input#costData\\.biomassFeedstockPrice';
  costDataBiomassFeedstockPriceUnit = '#costData\\.biomassFeedstockPrice_select';

  //Value Change according to Feedstock type selected in Feed section
  costDataOtherFeedstockPriceTxt = 'input#costData\\.otherFeedstockPrice';
  costDataOtherFeedstockPriceUnit = '#costData\\.otherFeedstockPrice_select';

  costDataElectricityImportPriceTxt = '#costData\\.electricityImportPrice';
  costDataCostCoolingWaterTxt = '#costData\\.coolingWaterCost';
  costDataDemineralisedWaterCostTxt = '#costData\\.demineralisedWaterCost';

  //Feed Details
  feedDetailsJMScope = '#GLOBAL\\.JMScope';

  //Feed Details - Carbon Dioxide
  feedDetailsCO2TypicalValueYes = 'input[name="fieldset-feedDetails.FTHyCoGenUseTypicalCO2"][value="yes"]';
  feedDetailsCO2TypicalValueNo = 'input[name="fieldset-feedDetails.FTHyCoGenUseTypicalCO2"][value="no"]';

  feedDetailsCO2 = 'input#feedDetails\\.FTHyCoGenUseTypicalCO2CarbonDioxide';
  feedDetailsH2 = 'input#feedDetails\\.FTHyCoGenUseTypicalCO2Hydrogen';
  feedDetailsCH4 = 'input#feedDetails\\.FTHyCoGenUseTypicalCO2Methane';
  feedDetailsInerts = 'input#feedDetails\\.FTHyCoGenUseTypicalCO2Inerts';

  feedDetailsContaminantTypicalValueYes = 'input[name="fieldset-feedDetails.FTHyCoGenUseTypicalContaminantLimitsCO2"][value="yes"]';
  feedDetailsContaminantTypicalValueNo = 'input[name="fieldset-feedDetails.FTHyCoGenUseTypicalContaminantLimitsCO2"][value="no"]';

  feedDetailsO2 = 'input#feedDetails\\.FTHyCoGenUseTypicalCO2ContaminantO2';
  feedDetailsNH3 = 'input#feedDetails\\.FTHyCoGenUseTypicalCO2ContaminantAmmonia';
  feedDetailsS8 = 'input#feedDetails\\.FTHyCoGenUseTypicalCO2ContaminantSulphur';
  feedDetailsHCN = 'input#feedDetails\\.FTHyCoGenUseTypicalCO2ContaminantHCN';
  feedDetailsMX = 'input#feedDetails\\.FTHyCoGenUseTypicalCO2ContaminantHalides';
  feedDetailsAsH3 = 'input#feedDetails\\.FTHyCoGenUseTypicalCO2ContaminantArsine';
  feedDetailsPH3 = 'input#feedDetails\\.FTHyCoGenUseTypicalCO2ContaminantPhosphine';
  feedDetailsHeavyMetals = 'input#feedDetails\\.FTHyCoGenUseTypicalCO2ContaminantHeavyMetals';
  feedDetailsFECO5 = 'input#feedDetails\\.FTHyCoGenUseTypicalCO2ContaminantIronCarbonyl';
  feedDetailsNICO4 = 'input#feedDetails\\.FTHyCoGenUseTypicalCO2ContaminantNickelCarbonyl';
  feedDetailsTars = 'input#feedDetails\\.FTHyCoGenUseTypicalCO2ContaminantTars';
  feedDetailsParticulates = 'feedDetails\\.FTHyCoGenUseTypicalCO2ContaminantParticulates';

  feedDetailsTempretureNormal = 'input#feedDetails\\.CO2ToISBLUnitTemperature.normal';
  feedDetailsTempretureDesign = 'input#feedDetails\\.CO2ToISBLUnitTemperature.design';
  feedDetailsTempretureUnit = '#feedDetails\\.CO2ToISBLUnitTemperature_select';
  feedDetailsPressureNormal = 'input#feedDetails\\.CO2ToISBLUnitPressure.normal';
  feedDetailsPressureDesign = 'input#feedDetails\\.CO2ToISBLUnitPressure.design';
  feedDetailsPressureUnit = '#feedDetails\\.CO2ToISBLUnitPressure_select';
  feedDetailsFlowRate = 'input#feedDetails\\.FTHyCoGenCO2Flowrate';
  feedDetailsFlowRateUnit = '#feedDetails\\.FTHyCoGenCO2Flowrate_select';

  //Feed Details - Hydrogen
  feedDetailsH2TypicalValueYes = 'input[name="fieldset-feedDetails.FTHyCoGenUseTypicalHydrogen"][value="yes"]';
  feedDetailsH2TypicalValueNo = 'input[name="fieldset-feedDetails.FTHyCoGenUseTypicalHydrogen"][value="No"]';

  feedDetailsH2Value = 'input#feedDetails\\.FTHyCoGenUseTypicalHydrogenH2';
  feedDetailsO2Value = 'input#feedDetails\\.FTHyCoGenUseTypicalHydrogenO2';

  feedDetailsH2ContaminantTypicalValueYes = 'input[name="fieldset-feedDetails.FTHyCoGenUseTypicalContaminantLimitsHydrogen"][value="yes"]';
  feedDetailsH2ContaminantTypicalValueNo = 'input[name="fieldset-feedDetails.FTHyCoGenUseTypicalContaminantLimitsHydrogen"][value="no"]';

  feedDetailsFTHyCoGenO2 = "#feedDetails\\.FTHyCoGenUseTypicalHydrogenContaminantO2";
  feedDetailsFTHyCoGenAmmonia = "#feedDetails\\.FTHyCoGenUseTypicalHydrogenContaminantAmmonia";
  feedDetailsFTHyCoGenSulphur = "#feedDetails\\.FTHyCoGenUseTypicalHydrogenContaminantSulphur";
  feedDetailsFTHyCoGenHCN = "#feedDetails\\.FTHyCoGenUseTypicalHydrogenContaminantHCN";
  feedDetailsFTHyCoGenHalides = "#feedDetails\\.FTHyCoGenUseTypicalHydrogenContaminantHalides";
  feedDetailsFTHyCoGenArsine = "#feedDetails\\.FTHyCoGenUseTypicalHydrogenContaminantArsine";
  feedDetailsFTHyCoGenPhosphine = "#feedDetails\\.FTHyCoGenUseTypicalHydrogenContaminantPhosphine";
  feedDetailsFTHyCoGenHeavyMetals = "#feedDetails\\.FTHyCoGenUseTypicalHydrogenContaminantHeavyMetals";
  feedDetailsFTHyCoGenIronCarbonyl = "#feedDetails\\.FTHyCoGenUseTypicalHydrogenContaminantIronCarbonyl";
  feedDetailsFTHyCoGenNickelCarbonyl = "#feedDetails\\.FTHyCoGenUseTypicalHydrogenContaminantNickelCarbonyl";
  feedDetailsFTHyCoGenTars = "#feedDetails\\.FTHyCoGenUseTypicalHydrogenContaminantTars";
  feedDetailsFTHyCoGenParticulates = "#feedDetails.FTHyCoGenUseTypicalHydrogenContaminantParticulates";

  feedDetailsISBLTempretureNormal = 'input#feedDetails\\.hydrogenToISBLUnitTemperature.normal';
  feedDetailsISBLTempretureDesign = 'input#feedDetails\\.hydrogenToISBLUnitTemperature.design';
  feedDetailsISBLTempretureUnit = '#feedDetails\\.hydrogenToISBLUnitTemperature_select';
  feedDetailsCO2toISBLPressureNormal = 'input#ffeedDetails\\.hydrogenToISBLUnitPressure.normal';
  feedDetailsCO2toISBLPressureDesign = 'input#feedDetails\\.hydrogenToISBLUnitPressure.design';
  feedDetailsCO2toISBLPressureUnit = '#feedDetails\\.hydrogenToISBLUnitPressure_select';
  feedDetailsTotalHydrogenFlowRate = 'input#feedDetails\\.FTHyCoGenHydrogenFlowrate';
  feedDetailsTotalHydrogenUnit = '#feedDetails\\.FTHyCoGenHydrogenFlowrate_select';

  //Feed Details - Oxygen
  feedDetailsO2TypicalValueYes = 'input[name="fieldset-feedDetails.FTHyCoGenUseTypicalOxygen"][value="yes"]';
  feedDetailsO2TypicalValueNo = 'input[name="fieldset-feedDetails.FTHyCoGenUseTypicalOxygen"][value="yes"]';

  feedDetailsO2TypicalValueTxt = 'input#feedDetails\\.FTHyCoGenUseTypicalOxygenO2';
  feedDetailsH2TypicalValueTxt = 'input#feedDetails\\.FTHyCoGenUseTypicalOxygenH2';
  feedDetailsN2TypicalValueTxt = 'input#feedDetails\\.FTHyCoGenUseTypicalOxygenN2';

  feedDetailsO2ContaminantTypicalValueYes = 'input[name="fieldset-feedDetails.FTHyCoGenUseTypicalContaminantLimitsOxygen"][value="yes"]';
  feedDetailsO2ContaminantTypicalValueNo = 'input[name="fieldset-feedDetails.FTHyCoGenUseTypicalContaminantLimitsOxygen"][value="no"]';

  feedDetailsFTHyCoGenOxygenAmmonia = "#feedDetails\\.FTHyCoGenUseTypicalOxygenContaminantAmmonia";
  feedDetailsFTHyCoGenOxygenSulphur = "#feedDetails\\.FTHyCoGenUseTypicalOxygenContaminantSulphur";
  feedDetailsFTHyCoGenOxygenHCN = "#feedDetails\\.FTHyCoGenUseTypicalOxygenContaminantHCN";
  feedDetailsFTHyCoGenOxygenHalides = "#feedDetails\\.FTHyCoGenUseTypicalOxygenContaminantHalides";
  feedDetailsFTHyCoGenOxygenArsine = "#feedDetails\\.FTHyCoGenUseTypicalOxygenContaminantArsine";
  feedDetailsFTHyCoGenOxygenPhosphine = "#feedDetails\\.FTHyCoGenUseTypicalOxygenContaminantPhosphine";
  feedDetailsFTHyCoGenOxygenHeavyMetals = "#feedDetails\\.FTHyCoGenUseTypicalOxygenContaminantHeavyMetals";
  feedDetailsFTHyCoGenOxygenIronCarbonyl = "#feedDetails\\.FTHyCoGenUseTypicalOxygenContaminantIronCarbonyl";
  feedDetailsFTHyCoGenOxygenNickelCarbonyl = "#feedDetails\\.FTHyCoGenUseTypicalOxygenContaminantNickelCarbonyl";
  feedDetailsFTHyCoGenOxygenTars = "#feedDetails\\.FTHyCoGenUseTypicalOxygenContaminantTars";
  feedDetailsFTHyCoGenOxygenParticulates = "#feedDetails\\.FTHyCoGenUseTypicalOxygenContaminantParticulates";

  feedDetailsO2ISBLTempretureNormal = 'input#feedDetails\\.oxygenToISBLUnitTemperature.normal';
  feedDetailsO2ISBLTempretureDesign = 'input#feedDetails\\.oxygenToISBLUnitTemperature.design';
  feedDetailsO2ISBLTempretureUnit = '#ffeedDetails\\.oxygenToISBLUnitTemperature_select';
  feedDetailsO2toISBLPressureNormal = 'input#feedDetails\\.oxygenToISBLUnitPressure.normal';
  feedDetailsO2toISBLPressureDesign = 'input#feedDetails\\.oxygenToISBLUnitPressure.design';
  feedDetailsO2toISBLPressureUnit = '#feedDetails\\.oxygenToISBLUnitPressure_select';
  feedDetailsTotalOxygenFlowRate = 'input#feedDetails\\.FTHyCoGenOxygenFlowrate';
  feedDetailsTotalOxygenUnit = '#feedDetails\\.FTHyCoGenOxygenFlowrate_select';

  //Feeds
  feedstockDropDown = 'div#feeds\\.rawFeedstock';
  feedsConditionTempreture = '#feeds\\.FTHyCoGenTemperature';
  feedsConditionPressure = '#feeds\\.FTHyCoGenPressure';
  feedsOtherRawFeedstock = '#feeds\\.rawFeedstockOther'
  feedCompositionYes = 'input[name="fieldset-feeds.FTHyCoGenUseTypicalValues"][value="yes"]';
  feedCompositionNo = 'input[name="fieldset-feeds.FTHyCoGenUseTypicalValues"][value="no"]';

  feedFeedCompositionCO2 = '#feeds\\.FTHyCoGenCarbonDioxideCO2';
  feedFeedCompositionCO2H2 = '#feeds\\.FTHyCoGenCarbonDioxideH2';
  feedFeedCompositionMethane = '#feeds\\.FTHyCoGenCarbonDioxideMethane';
  feedFeedCompositionInerts = '#feeds\\.FTHyCoGenCarbonDioxideInerts';
  feedFeedCompositionH2H2 = '#feeds\\.FTHyCoGenHydrogenH2';
  feedFeedCompositionH2O2 = '#feeds\\.FTHyCoGenHydrogenO2';
  feedFeedCompositionO2O2 = '#feeds\\.FTHyCoGenOxygenO2';
  feedFeedCompositionO2H2 = '#feeds\\.FTHyCoGenOxygenH2';
  feedFeedCompositionO2N2 = '#feeds\\.FTHyCoGenOxygenN2';

  //Project Requirements Guideline
  projectDetails = 'div > div > div > nav > ul > div:nth-child(1) > div:nth-child(3) > div > span:nth-child(2)';
  finalProducAndCapacity = 'div > div > div > nav > ul > div:nth-child(1) > div:nth-child(4) > div > span:nth-child(2)';
  feed = 'div > div > div > nav > ul > div:nth-child(1) > div:nth-child(5) > div > span:nth-child(2)';
  projectFinance = 'div > div > div > nav > ul > div:nth-child(1) > div:nth-child(7) > div > span:nth-child(2)';

  //Other Technology
  otherTechnologyOtherCosts = 'textarea#otherTechnology\\.otherCosts';
  otherTechnologyOtherParties = 'textarea#otherTechnology\\.otherParties';

  //In Depth Project Requirements
  feedDetails = 'div > div > div > nav > ul > div:nth-child(2) > div:nth-child(2) > div > span:nth-child(2)';
  products = 'div > div > div > nav > ul > div:nth-child(2) > div:nth-child(3) > div > span:nth-child(2)';
  utilities = 'div > div > div > nav > ul > div:nth-child(2) > div:nth-child(4) > div > span:nth-child(2)';
  plot = 'div > div > div > nav > ul > div:nth-child(2) > div:nth-child(5) > div > span:nth-child(2)';
  siteData = 'div > div > div > nav > ul > div:nth-child(2) > div:nth-child(6) > div > span:nth-child(2)';
  costData = 'div > div > div > nav > ul > div:nth-child(2) > div:nth-child(7) > div > span:nth-child(2)';
  schedule = 'div > div > div > nav > ul > div:nth-child(2) > div:nth-child(8) > div > span:nth-child(2)';
  otherTechnology = 'div > div > div > nav > ul > div:nth-child(2) > div:nth-child(9) > div > span:nth-child(2)';

  //Plot
  plotLength = 'input#plot\\.availableAreaLength';
  plotLengthUnit = 'div#plot\\.availableAreaLength_select';

  plotWidth = 'input#plot\\.availableAreaWidth';
  plotWidthUnit = 'div#plot\\.availableAreaWidth_select';

  plotAdditionalConsideration = 'textarea#plot\\.additionalConsiderations';

  plotRestrictionAir = 'input[name="fieldset-plot.anyRestrictionsAirNavigation"]';
  plotRestrictionShipping = 'input[name="fieldset-plot.anyRestrictionsShippingToSite"]';

  //Schedule
  schedulePreFeedStartDate = 'input#schedule\\.preFEEDStudyStartDate';
  scheduleFeedStartDate = 'input#schedule\\.FEEDStartDate';
  scheduleFinalInvestmentDecisionDate = 'input#schedule\\.finalInvestmentDecisionDate';
  scheduleConstructionDate = 'input#schedule\\.startConstructionDate';
  scheduleStartUpDate = 'input#schedule\\.startUpDate';

  //Product
  productwaxTypicalValuesAcceptableYes = 'input[name="fieldset-products.JMWaxTypicalValuesAcceptable"][value="yes"]';
  productlightHydrocarbonCondensateTypicalValuesAcceptableYes = 'input[name="fieldset-products.JMLightHydrocarbonCondensateTypicalValuesAcceptable"][value="yes"]';
  productbasisForPlantCapacityFinalProduct = 'input[name="fieldset-GLOBAL.basisForPlantCapacity"][value="Final Product"]';
  productplantCapacityRequiredInput = 'input#GLOBAL\\.basisForPlantCapacityCapacityRequired';
  productplantCapacityRequiredSelect = 'div#GLOBAL\\.basisForPlantCapacityCapacityRequired_select';
  productminimumTurndownPercentageCapacityInput = 'input#GLOBAL\\.minimumTurndownPercentageCapacity';
  productoperatingHoursPerYearInput = 'input#GLOBAL\\.operatingHoursPerYear';
  productrequiresMultipleTrainsNo = 'input[name="fieldset-GLOBAL.requiresMultipleTrains"][value="no"]';

  //Project Details
  companyName = 'input#projectDetails\\.companyName';
  companyLegalName = 'input#projectDetails\\.companyLegalName';
  companyRegisteredAddress = 'textarea#projectDetails\\.companyRegisteredAddress';
  companyRegisteredNumber = 'input#projectDetails\\.companyRegisteredNumber';
  projectName = 'input#projectDetails\\.projectName';
  projectLocation = 'input#projectDetails\\.projectLocation';

  hasFeedstockSupplierNo = 'input[name="fieldset-projectDetails.hasFeedstockSupplier"][value="no"]';
  hasProductOfftakerNo = 'input[name="fieldset-projectDetails.hasProductOfftaker"][value="no"]';
  hasSiteNo = 'input[name="fieldset-projectDetails.hasSite"][value="no"]';

  //Finance
  financeProposal = 'textarea#projectFinance\\.projectFinanceProposal';

  financeInternalFinanced = 'input[name="fieldset-projectFinance.isInternallyFinanced"]';
  financeSources = 'input[name="fieldset-projectFinance.usingDebtAndEquityToFinance"]';
  financeGovernmentGrantAssist = 'input[name="fieldset-projectFinance.governmentGrantsAssistingWithFinance"]';
  financePurposeVehicle = 'input[name="fieldset-projectFinance.financingThroughSpecialPurposeVehicle"]';

  //Site Data
  siteLocation = 'textarea#siteData\\.location';
  siteSeaLevel = 'input#siteData\\.elevationRelativeToSeaLevel';
  siteSeaLevelUnit = 'div#siteData\\.elevationRelativeToSeaLevel_select';

  siteSeaLevelRelative = 'input#siteData\\.elevationRelativeToSeaLevel';
  siteSeaLevelRelativeUnit = 'div#siteData\\.elevationRelativeToSeaLevel_select';

  siteCostalEnvironment = 'input#siteData\\.coastalEnvironment';
  siteAirQuality = 'input#siteData\\.airQualityData';

  siteLimitStructureHeight = 'input#siteData\\.limitOnStructuralHeight';
  siteLimitStructureHeightUnit = 'div#siteData\\.limitOnStructuralHeight_select';

  siteYearlyTempreture = 'input#siteData\\.averageYearlyTemperature';
  siteYearlyTempretureUnit = 'div#siteData\\.averageYearlyTemperature_select';
  
  siteAverageYearlyTempreture = 'input#siteData\\.averageYearlyTemperature';
  siteAverageYearlyTempretureUnit = 'div#siteData\\.averageYearlyTemperature_select';

  siteDesignBarometricPressure = 'input#siteData\\.designBarometricPressure';
  siteDesignBarometricPressureUnit = 'div#siteData\\.designBarometricPressure_select';

  siteAmbientTemperatureForTankVenting = 'input#siteData\\.ambientTemperatureForTankVenting';
  siteAmbientTemperatureForTankVentingUnit = 'div#siteData\\.ambientTemperatureForTankVenting_select';

  siteMaximumTemperatureForDryBulb = 'input#siteData\\.maximumTemperatureForDryBulb';
  siteMaximumTemperatureForDryBulbUnit = 'div#siteData\\.maximumTemperatureForDryBulb_select';

  siteMinimumDesignTemperatureForEquipment = 'input#siteData\\.minimumDesignTemperatureForEquipment';
  siteMinimumDesignTemperatureForEquipmentUnit = 'div#siteData\\.minimumDesignTemperatureForEquipment_select';

  siteAverageRelativeHumidity = 'input#siteData\\.averageRelativeHumidity';

  async enterUsername(username: string): Promise<void> {
    await this.page.fill(this.txtUsername, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill(this.txtPassword, password);
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.page.click(this.btnContinue);
    await this.enterPassword(password);
    await this.page.click(this.btnLogin);
    await expect(this.page.locator(this.logoJM)).toBeVisible({ timeout: 500000 });
  }

  async login_default(): Promise<void> {
    await this.page.waitForSelector(this.txtUsername, { timeout: 60000 });
    await this.enterUsername(config.usernameFT);
    await this.page.click(this.btnContinue);
    await this.page.waitForSelector(this.txtPassword, { timeout: 60000 });
    await this.enterPassword(config.passwordFT);
    await this.page.click(this.btnLogin);

    //await this.page.waitForURL("https://uat-dcf.ft.matthey.com/group/guest/project?**", { waitUntil: 'domcontentloaded', timeout: 80000 });

    await this.page.once('load', () => console.log('Test Page loaded!'));

    await this.page.waitForSelector(this.logoJM, { timeout: 80000 });
  }

  async selectJMScope(scope: 'FT + HyCoGen' | 'FT + Syngas conditioning' | 'FT Loop' | 'GTL'): Promise<void> {
    const scopeMapping = {
      'FT + HyCoGen': 'FT + HyCoGen',
      'FT + Syngas conditioning': 'FT + Syngas conditioning',
      'FT Loop': 'FT Loop',
      'GTL': 'GTL'
    };

    const dataValue = scopeMapping[scope];
    if (dataValue) {
      await this.page.locator(this.feedDetailsJMScope).click();
      await this.page.locator(`li[data-value="${dataValue}"]`).click();
    }
  }

  async verifyDropdownOptions(expectedValues: string[]): Promise<void> {
    for (const value of expectedValues) {
      const option = await this.page.locator(`li[data-value="${value}"]`);
      await expect(option).toBeVisible();
      await expect(option).toHaveText(value);
    }
  }

  async selectFeedRawFeedstock(feedstock: 'Biomass' | 'Municipal Solid Waste' | 'Natural Gas' | 'Biogas' | 'Carbon Dioxide + Hydrogen' | 'Other'): Promise<void> {

    const feedstockMapping = {
      'Biomass': 'Biomass',
      'Municipal Solid Waste': 'Municipal Solid Waste',
      'Natural Gas': 'Natural Gas',
      'Biogas': 'Biogas',
      'Carbon Dioxide + Hydrogen': 'Carbon Dioxide + Hydrogen',
      'Other': 'Other'
    };

    const dataValue = feedstockMapping[feedstock];
    if (dataValue) {
      await this.page.click(this.feedstockDropDown);
      //console.log(dataValue);

      await this.page.locator(`li[data-value="${dataValue}"]`).click();

      const selectedText = await this.page.locator(this.feedstockDropDown).innerText();

      await expect(selectedText).toContain(dataValue);
    }

    if (dataValue == 'Other') {
     await this.page.locator(this.feedsOtherRawFeedstock).isVisible();
    }
  }

  async selectTempretureUnit(temperature: 'Celsius' | 'Fahrenheit'): Promise<void> {
    if (temperature = 'Celsius') {
      await this.page.locator('li[data-value="C"]').click();
    } else {
      await this.page.locator('li[data-value="F"]').click();
    }
  }

  async selectPressureUnit(pressure: 'Bar (a)' | 'psi (a)'): Promise<void> {
    if (pressure = 'Bar (a)') {
      await this.page.locator('li[data-value="Bar (a)"]').click();
    } else {
      await this.page.locator('li[data-value="psi (a)"]').click();
    }
  }

  async selectCapacityMeasurements(capacity: 'bbl/d' | 'lb/h' | 'MTPD' | 'kNm3/h' | 'scf/hr' | 'kg/h'): Promise<void> {

    const capacityMapping = {
      'bbl/d': 'bbl/d',
      'lb/h': 'lb/h',
      'MTPD': 'MTPD',
      'kNm3/h': 'kNm3/h',
      'scf/hr': 'scf/hr',
      'kg/h': 'kg/h'
    };

    const dataValue = capacityMapping[capacity];
    if (dataValue) {
      await this.page.locator(`li[data-value="${dataValue}"]`).click();
    }
  }

  async selectFinalProduct(product: 'FT Crude' | 'Sustainable Aviation Fuel (SAF)' | 'SAF, Diesel and Naphtha' | 'SAF and Naphtha' | 'Base Oil' | 'Diesel' | 'Diesel and Naphtha'): Promise<void> {

    await this.page.locator('#productAndCapacity\\.finalProductTargetType').click();

    const productMapping = {
      'FT Crude': 'FT Crude',
      'Sustainable Aviation Fuel (SAF)': 'Sustainable Aviation Fuel (SAF)',
      'SAF, Diesel and Naphtha': 'SAF, Diesel and Naphtha',
      'SAF and Naphtha': 'SAF and Naphtha',
      'Base Oil': 'Base Oil',
      'Diesel': 'Diesel',
      'Diesel and Naphtha': 'Diesel and Naphtha'
    }

    const dataValue = productMapping[product];
    if (dataValue) {
      await this.page.locator(`li[data-value="${dataValue}"]`).click();
    }
  }

  //Feed Details - CO2
  async selectCO2TypicalValue(option: 'yes' | 'no', values: CO2Values = {}): Promise<void> {
    // Click the appropriate radio button based on the user's choice
    if (option === 'yes') {
      await this.page.locator(this.feedDetailsCO2TypicalValueYes).click();
    } else if (option === 'no') {
      await this.page.click(this.feedDetailsH2TypicalValueNo);

      // Fill in the additional values if option is 'no'
      await this.page.fill(this.feedDetailsCO2, values.co2 ?? '');
      await this.page.fill(this.feedDetailsH2, values.h2 ?? '');
      await this.page.fill(this.feedDetailsCH4, values.ch4 ?? '');
      await this.page.fill(this.feedDetailsInerts, values.inerts ?? '');
    } else {
      throw new Error('Invalid option provided. Use "yes" or "no".');
    }
  }

  async selectCO2ContainmentTypicalValue(option: 'yes' | 'no', values: Contaminant = {}): Promise<void> {
    if (option === 'yes') {
      await this.page.locator(this.feedDetailsContaminantTypicalValueYes).click();
    } else if (option === 'no') {
      await this.page.locator(this.feedDetailsContaminantTypicalValueNo).click();

      await this.page.fill(this.feedDetailsO2, values.o2 ?? '');
      await this.page.fill(this.feedDetailsNH3, values.nh3 ?? '');
      await this.page.fill(this.feedDetailsS8, values.s8 ?? '');
      await this.page.fill(this.feedDetailsHCN, values.hcn ?? '');
      await this.page.fill(this.feedDetailsMX, values.mx ?? '');
      await this.page.fill(this.feedDetailsAsH3, values.AsH3 ?? '');
      await this.page.fill(this.feedDetailsPH3, values.PH3 ?? '');
      await this.page.fill(this.feedDetailsHeavyMetals, values.HeavyMetals ?? '');
      await this.page.fill(this.feedDetailsFECO5, values.FECO5 ?? '');
      await this.page.fill(this.feedDetailsNICO4, values.NICO4 ?? '');
      await this.page.fill(this.feedDetailsTars, values.Tars ?? '');
      await this.page.fill(this.feedDetailsParticulates, values.Particulates ?? '');

    }
  }

  async insertCO2toISBLTempreture(normalTemp?: string, designTemp?: string, tempretureUnit?: string): Promise<void> {
    try {
      if (normalTemp !== undefined) {
        await this.page.locator(this.feedDetailsTempretureNormal).fill(normalTemp);
      }

      if (designTemp !== undefined) {
        await this.page.locator(this.feedDetailsTempretureDesign).fill(designTemp);
      }

      this.page.locator(this.feedDetailsTempretureUnit).click();
      this.selectValueFromDropDown(`${tempretureUnit}`);

    } catch (error) {
      console.error("Error filling CO2 temperature values:", error);
      // You can handle the error as needed, such as logging it or rethrowing it
    }
  }

  async insertCO2toISBLPressure(normalPressure?: string, designPressure?: string, pressureUnit?: string): Promise<void> {
    try {
      if (normalPressure !== undefined) {
        await this.page.locator(this.feedDetailsTempretureNormal).fill(normalPressure);
      }

      if (designPressure !== undefined) {
        await this.page.locator(this.feedDetailsTempretureDesign).fill(designPressure);
      }

      this.page.locator(this.feedDetailsPressureUnit).click();
      this.selectValueFromDropDown(`${pressureUnit}`);

    } catch (error) {
      console.error("Error filling CO2 temperature values:", error);
      // You can handle the error as needed, such as logging it or rethrowing it
    }
  }

  //Feed Details - H2
  async selectH2TypicalValue(option: 'yes' | 'no', values: CO2Values = {}): Promise<void> {
    if (option === 'yes') {
      await this.page.locator(this.feedDetailsH2TypicalValueYes).click();
    } else if (option === 'no') {
      await this.page.click(this.feedDetailsCO2TypicalValueNo);

      // Fill in the additional values if option is 'no'
      await this.page.fill(this.feedDetailsH2Value, values.co2 ?? '');
      await this.page.fill(this.feedDetailsO2Value, values.o2 ?? '');
    } else {
      throw new Error('Invalid option provided. Use "yes" or "no".');
    }
  }

  async selectH2ContainmentTypicalValue(option: 'yes' | 'no', values: Contaminant = {}): Promise<void> {
    if (option === 'yes') {
      await this.page.locator(this.feedDetailsH2ContaminantTypicalValueYes).click();
    } else if (option === 'no') {
      await this.page.locator(this.feedDetailsH2ContaminantTypicalValueNo).click();

      await this.page.fill(this.feedDetailsFTHyCoGenO2, values.o2 ?? '');
      await this.page.fill(this.feedDetailsFTHyCoGenAmmonia, values.nh3 ?? '');
      await this.page.fill(this.feedDetailsFTHyCoGenSulphur, values.s8 ?? '');
      await this.page.fill(this.feedDetailsFTHyCoGenHCN, values.hcn ?? '');
      await this.page.fill(this.feedDetailsFTHyCoGenHalides, values.mx ?? '');
      await this.page.fill(this.feedDetailsFTHyCoGenArsine, values.AsH3 ?? '');
      await this.page.fill(this.feedDetailsFTHyCoGenPhosphine, values.PH3 ?? '');
      await this.page.fill(this.feedDetailsFTHyCoGenHeavyMetals, values.HeavyMetals ?? '');
      await this.page.fill(this.feedDetailsFTHyCoGenIronCarbonyl, values.FECO5 ?? '');
      await this.page.fill(this.feedDetailsFTHyCoGenNickelCarbonyl, values.NICO4 ?? '');
      await this.page.fill(this.feedDetailsFTHyCoGenTars, values.Tars ?? '');
      await this.page.fill(this.feedDetailsFTHyCoGenParticulates, values.Particulates ?? '');
    }
  }

  async insertH2toISBLPressureormal(Pressure?: string, designPressure?: string, pressureUnit?: string): Promise<void> {
  }

  async insertH2toISBLTempreture(normalTemp?: string, designTemp?: string, tempretureUnit?: string): Promise<void> {
    try {
      if (normalTemp !== undefined) {
        await this.page.locator(this.feedDetailsO2ISBLTempretureNormal).fill(normalTemp);
      }

      if (designTemp !== undefined) {
        await this.page.locator(this.feedDetailsO2ISBLTempretureDesign).fill(designTemp);
      }

      this.page.locator(this.feedDetailsO2ISBLTempretureUnit).click();
      this.selectValueFromDropDown(`${tempretureUnit}`);

    } catch (error) {
      console.error("Error filling CO2 temperature values:", error);
      // You can handle the error as needed, such as logging it or rethrowing it
    }
  }

  //Feed Details - O2
  async selectO2TypicalValue(option: 'yes' | 'no', values: CO2Values = {}): Promise<void> {
    if (option === 'yes') {
      await this.page.locator(this.feedDetailsO2TypicalValueYes).click();
    } else if (option === 'no') {
      await this.page.click(this.feedDetailsO2TypicalValueNo);

      // Fill in the additional values if option is 'no'
      await this.page.fill(this.feedDetailsO2TypicalValueTxt, values.o2 ?? '');
      await this.page.fill(this.feedDetailsH2TypicalValueTxt, values.h2 ?? '');
      await this.page.fill(this.feedDetailsN2TypicalValueTxt, values.n2 ?? '');
    } else {
      throw new Error('Invalid option provided. Use "yes" or "no".');
    }
  }

  async selectO2ContainmentTypicalValue(option: 'yes' | 'no', values: Contaminant = {}): Promise<void> {
    if (option === 'yes') {
      await this.page.locator(this.feedDetailsO2ContaminantTypicalValueYes).click();
    } else if (option === 'no') {
      await this.page.locator(this.feedDetailsO2ContaminantTypicalValueNo).click();

      await this.page.fill(this.feedDetailsO2, values.o2 ?? '');
      await this.page.fill(this.feedDetailsNH3, values.nh3 ?? '');
      await this.page.fill(this.feedDetailsS8, values.s8 ?? '');
      await this.page.fill(this.feedDetailsHCN, values.hcn ?? '');
      await this.page.fill(this.feedDetailsMX, values.mx ?? '');
      await this.page.fill(this.feedDetailsAsH3, values.AsH3 ?? '');
      await this.page.fill(this.feedDetailsPH3, values.PH3 ?? '');
      await this.page.fill(this.feedDetailsHeavyMetals, values.HeavyMetals ?? '');
      await this.page.fill(this.feedDetailsFECO5, values.FECO5 ?? '');
      await this.page.fill(this.feedDetailsNICO4, values.NICO4 ?? '');
      await this.page.fill(this.feedDetailsTars, values.Tars ?? '');
      await this.page.fill(this.feedDetailsParticulates, values.Particulates ?? '');

    }
  }

  async insertO2toISBLTempreture(normalTemp?: string, designTemp?: string, tempretureUnit?: string): Promise<void> {
    try {
      if (normalTemp !== undefined) {
        await this.page.locator(this.feedDetailsO2ISBLTempretureNormal).fill(normalTemp);
      }

      if (designTemp !== undefined) {
        await this.page.locator(this.feedDetailsO2ISBLTempretureDesign).fill(designTemp);
      }

      this.page.locator(this.feedDetailsO2ISBLTempretureUnit).click();
      this.selectValueFromDropDown(`${tempretureUnit}`);

    } catch (error) {
      console.error("Error filling CO2 temperature values:", error);
      // You can handle the error as needed, such as logging it or rethrowing it
    }
  }

  async insertO2toISBLPressure(normalPressure?: string, designPressure?: string, pressureUnit?: string): Promise<void> {
    try {
      if (normalPressure !== undefined) {
        await this.page.locator(this.feedDetailsO2toISBLPressureNormal).fill(normalPressure);
      }

      if (designPressure !== undefined) {
        await this.page.locator(this.feedDetailsO2toISBLPressureDesign).fill(designPressure);
      }

      this.page.locator(this.feedDetailsO2toISBLPressureUnit).click();
      this.selectValueFromDropDown(`${pressureUnit}`);

    } catch (error) {
      console.error("Error filling CO2 temperature values:", error);
      // You can handle the error as needed, such as logging it or rethrowing it
    }
  }

  async checkBasisForPlantCapacity(value: 'FT Crude' | 'Feedstock Limited' | 'Final Product'): Promise<void> {
    const selector = `input[name="fieldset-GLOBAL.basisForPlantCapacity"][value="${value}"]`;

    try {
      const element = this.page.locator(selector);
      await element.click();
      console.log(`Clicked on the element with value: ${value}`);
    } catch (error) {
      console.error(`Error clicking on the element with value: ${value}`, error);
    }
  }

  async checkRestriction(optionName: string, value: 'yes' | 'no'): Promise<void> {
    await this.page.check(`${optionName}[value="${value}"]`);
  }
}