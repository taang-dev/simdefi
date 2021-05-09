import { Component, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Observable, Observer } from "rxjs";
import apps from '../assets/apps.json';
import farms from '../assets/farms.json';


@Component({
  selector: "taang-app",
  templateUrl: './app.component.html',
  styles: [
    `
      /* component */
      .ct-pcs-svg-description {
        fill: #7645d9;
      }
      .ct-pcs-svg-refresh {
        fill: #7645d9;
      }

      .ct-pcs-svg {
        fill: #7645d9;
        height: 25px;
        width: 25px;
      }

      .ct-pcs-compound-type-info {
        align-items: center;
        color: #7645d9;
        display: flex;
        height: 28px;
        width: 90.8125px;
        border: 2px solid #7645d9;
        border-radius: 16px;
        font: 14px / 14px Kanit, sans-serif;
        padding: 0px 8px;
      }

      .ct-pcs-footer-left{
        display: flex;
        padding-top: 10px;
      }

      .ct-pcs-button {
        block-size: 48px;
        border-block-end-style: none;
        border-block-start-style: none;
        border-block-start-width: 0px;]
        border-inline-end-color: rgb(255, 255, 255);
        border-inline-end-style: none;
        border-inline-end-width: 0px;
        border-inline-start-color: rgb(255, 255, 255);
        border-inline-start-style: none;
        border-inline-start-width: 0px;
        border-radius: 16px;
        box-shadow: rgb(14 14 44 / 40%) 0px -1px 0px 0px inset;
        color: #fff;
        cursor: pointer;
        inline-size: 102.781px;
        letter-spacing: 0.48px;
      }

      .ct-pcs-card {
        box-shadow: rgb(83 222 233) 0px 0px 0px 2px;
        width: 280px;
        background: #fff none repeat scroll 0% 0% / auto padding-box border-box;
        border-radius: 32px;
        overflow: hidden;
      }

      .ct-pcs-header {
        height: 112px;
        background: #0000 linear-gradient(139.73deg, #e6fdff 0%, #f3efff 100% ) repeat scroll 0% 0% / auto padding-box border-box;
        font: 16px / 16px Kanit, sans-serif;
        padding: 24px;
        display: flex;
      }

      .ct-pcs-header-content {
        width: 100%;
      }

      .ct-pcs-header-content-main {
        color: #7645d9;
        font: 600 24px / 26.4px Kanit, sans-serif;
      }

      .ct-pcs-header-content-sub {
        color: #8f80ba;
        font: 16px / 24px Kanit, sans-serif;
      }

      .ct-pcs-header-icon {
        width: 60px;
        position: relative;
      }

      .ct-pcs-header-icon img {
        block-size: 50px;
        inline-size: 50px;
        position: relative;
      }

      .ct-pcs-content {
        height: 254px;
        font: 16px / 16px Kanit, sans-serif;
        padding: 24px;
      }      
      
      .ct-pcs-content-labelvalue {
        display: flex;
        justify-content: space-between;
        color: #452a7a;
      }
      
      .ct-pcs-content-labelvalue-amount{
        width: 100%;
      }
      
      .ct-pcs-content-labelvalue-amount span {
        font: 600 16px Kanit, sans-serif;
        float: right;
      }
      
      .ct-pcs-content-labelvalue-amount svg {
        margin-top: -1px;
        margin-left: 5px;
        fill: #452a7a;
        float: right;
      }

      .ct-pcs-content-detail-keyword {
        color: #452a7a;
        font: 600 12px / 18px Kanit, sans-serif;
        line-height: 2;
      }
      .ct-pcs-content-detail-subkeyword {
        color: #8f80ba;
        font: 600 12px / 18px Kanit, sans-serif;
        line-height: 2;
      }
      .ct-pcs-content-detail-total {
        color: #452a7a;
        font: 600 20px / 22px Kanit, sans-serif;
      }
      .ct-pcs-content-detail-subtotal {
        color: #8f80ba;
        font: 600 12px / 18px Kanit, sans-serif;
      }

      .ct-pcs-footer {
        height: 97px;
        border-top: 1px solid #e9eaeb;
        font: 16px / 16px Kanit, sans-serif;
        padding: 24px;
        display: flex;
      }


      /*** Mode Ant ***/
      .ant-input-disabled {
        background-color: #f3f3f3;
        color: #7b7b7b;
      }
      /*** End ***/


      .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 24px 16px 0;
        float: left;
      }

      [nz-menu] {
        line-height: 64px;
      }

      nz-breadcrumb {
        margin: 16px 0;
      }

      nz-content {
        /*padding: 0 50px;*/
      }

      nz-footer {
        text-align: center;
      }

      .inner-content {
        margin: auto;
        max-width: 280px;
      }

      .content {
        width: 100%;
        padding: 20px 5px;
      }
            
      .sub-content {
        max-width: 600px;
        margin: auto;
      }

      /* CUSTOM */
      .ct-w-100 {
        width: 100%;
      }

      .ct-p-md {
        padding: 20px;
      }

      .ct-m-xs {
        margin: 3px;
      }

      .ct-mt-lg {
        margin-top: 30px;
      }

      .ct-bg-green {
        background-color: #1fc7d4;
      }

      .ct-bg-purple {
        background-color: #452a7a;
      }

      .ct-bg-red {
        background-color: #ed4b9e;
      }

      .ct-font-sm {
        font-size: 10px;
      }

      .ct-font-md {
        font-size: 12px;
      }

      .ct-flex {
        display: flex;
      }

      .ct-after-input-box {
        padding: 4px;
        width: 100px;
        font-size: 10px;
        text-align: center;
        border: 1px solid #d9d9d9;
        background-color: #f7f7f7;
        display:flex; 
        align-items:center;
        justify-content: center;
        color: #8a8a8a;
        text-transform:uppercase;
      }

      .ct-uppercase {
        text-transform: uppercase;
      }

      .ct-icon-menu {
        color: #a5a5a5;
        display: flex;
        align-items: center;
        font-size: x-large;
      }

      .ct-footer {
        padding: 0;
      }

      .ct-footer-main {
        background-color: #001529;
        color: #a5a5a5;
        padding: 20px;
      }

      .ct-footer-sub {
        background-color: black;
        color: #a5a5a5;
        padding: 20px;
      }
  `
  ]
})
export class NzDemoLayoutTopComponent {
  i18n;
  appList;
  farmList;
  farms;
  confirmModal?: NzModalRef;
  vForm: FormGroup;
  screenControl = {
    openMenu: false,
  }
  currentInfo:any = {}

  //Control param
  maxStakeTime: number = 365 * 10
  maxStakeTimeYear: number = 100
  maxCompoundFrequency: number = 9999999999
  maxInterestRate: number = 9999999999.99 // 9,999,999,999.99
  maxStakingAmount: number = 9999999999.99999999
  maxStakingTokenPrice: number = 9999999999.99999999
  maxEarninAmount: number = 9999999999.99999999
  maxEarningTokenPrice: number = 9999999999.99999999


  constructor(private modal: NzModalService, 
    private fb: FormBuilder, 
    private notification: NzNotificationService,
    private message: NzMessageService,) {
    this.vForm = this.fb.group({
      app: [null, [Validators.required]],
      appInfo: [null],
      farm: [null, [Validators.required]],
      farmInfo: [null],
      stakingAmount: [null, [Validators.required]],
      stakingToken: [null, [Validators.required]],
      stakingTokenPrice: [null],
      earningToken: [null, [Validators.required]],
      earningTokenPrice: [null],
      interestRate: [null, [Validators.required]],
      interestType: [null],
      stakingTime: [null, [Validators.required]],
      stakingTerm: [null],
      compound: [false],
      compoundFrequency: [null],
    });

    this.vForm.controls.app.valueChanges.subscribe((app)=>{
      //Assign app info
      const appInfo = this.appList.filter((itm)=>itm.app == app)
      const firstApp = appInfo.length && appInfo[0]?appInfo[0]:null
      this.vForm.controls.appInfo.setValue(firstApp)

      if(app == 'custom') {
        this.vForm.controls.stakingToken.enable()
        this.vForm.controls.earningToken.enable()
        this.vForm.controls.interestType.enable()

        //Reset old data
        this.vForm.controls.farm.setValue(null,{ emitEvent: false })
        this.vForm.controls.farmInfo.setValue(null)
        this.vForm.controls.stakingToken.setValue(null)
        this.vForm.controls.earningToken.setValue(null)
        this.vForm.controls.interestType.setValue('apr')
      }else{
        this.vForm.controls.stakingToken.disable()
        this.vForm.controls.earningToken.disable()
        this.vForm.controls.interestType.disable()
      }
      //Assign relate
      this.farms = []
      this.farms = this.farmList.filter((itm)=>itm.app == app)
      const farm = this.farms.length && this.farms[0]?this.farms[0]:null
      this.vForm.controls.farm.setValue(farm.key)
    })

    this.vForm.controls.farm.valueChanges.subscribe((farm)=>{
      if(this.farms[0].app == 'custom') {
        return
      }

      const farmInfo = this.findFarmInfoByKey(farm)
      this.vForm.controls.farmInfo.setValue(farmInfo)

      //Assign relate
      if(farmInfo){
        this.vForm.controls.stakingToken.setValue(farmInfo.stake || null)
        this.vForm.controls.earningToken.setValue(farmInfo.earn || null)
        this.vForm.controls.interestType.setValue(farmInfo.interestType || null)
      }
    })

    // this.vForm.controls.stakingTerm.valueChanges.subscribe((value)=>{
    //   if(value == 'days'){
    //     this.maxStakeTime = this.maxStakeTimeYear * 365
    //   }else if(value == 'months'){
    //     this.maxStakeTime = this.maxStakeTimeYear * 12
    //   }else if(value == 'years'){
    //     this.maxStakeTime = this.maxStakeTimeYear
    //   }
    // })

    this.appList = apps
    this.farmList = farms
  }

  ngOnInit(): void {
    //Initial
    this.vForm.controls.app.setValue('pancake')
    this.vForm.controls.stakingTerm.setValue('days')
    this.currentInfo = { ... this.vForm.getRawValue() }

    //Test lab
    // let apr = 89.04 //%
    // const manual = this.calculateManual(this.aprPerDay(90),{
    //   stakingAmount: 100,
    //   stakingTime: 365,
    //   stakingTerm: 'days',
    // })
    // console.log('apr',apr, 'manual', manual )

    // /////////

    // let apy = 139.33 //%
    // let aprForCompound = this.apyToApr(apy)
    // const compound = this.calculateCompound(this.aprPerDay(aprForCompound), {
    //   stakingAmount: 100,
    //   stakingTime: 365,
    //   stakingTerm: 'days',
    //   compoundFrequency: 2,
    // })
    // console.log('apy', apy, 'apr', aprForCompound, 'compound', compound )
  }

  /*** Calculate func ***/

  //APY% to APR% (per year)
  apyToApr(apy) {
    const apyRatio = 1+(apy / 100)
    const term = 365 //Daily
    const inverseTerm = 1 / term
    const apr = Math.pow(apyRatio,inverseTerm)
    return ((apr-1) * term) * 100
  }

  //APR% per day
  aprPerDay(apr) {
    return apr / 365
  }

  calculateCompound(aprPerDay, stakingTime, info) {
    //Compound Formular per day (p*(1+((r/100)/n))^(n*t))-p
    // p = stakeAmount| r = interest rate%(apr% per day) | n = number of times compound | t = number of days
    const actualEarn = info.stakingAmount*(Math.pow((1+((aprPerDay/100)/info.compoundFrequency)),(stakingTime*info.compoundFrequency)))-info.stakingAmount

    return actualEarn
  }

  calculateManual(aprPerDay, stakingTime, info) {

    //Formular per day earn (stake * (apr%/100)) / 365
    let perDayEarn = (info.stakingAmount * (aprPerDay / 100))
    let actualEarn = perDayEarn * stakingTime

    return actualEarn
  }
  
  /*** Calculate func end ***/

  findFarmInfoByKey(key) {
    return this.farms.filter((itm)=>itm.key == key)[0]
  }

  handleEdit(modalHeader, modalContent, modalFooter): void {
    this.confirmModal = this.modal.create({
      nzTitle: modalHeader,
      nzContent: modalContent,
      nzFooter: modalFooter,
      nzClosable: false,
      nzWidth: 800,
      nzIconType: null,
      nzMaskClosable: false,
      nzStyle: { top: '10px' }
    })
  }

  handleCancel() {
    this.vForm.markAsPristine()
    this.vForm.markAsUntouched()
    this.vForm.updateValueAndValidity()
    delete this.currentInfo.earnInfo
    this.vForm.setValue(this.currentInfo)
    this.confirmModal.close()
  }

  handleSave() {
    const cleanCurrentInfo = { ... this.currentInfo }
    try {
      
      //In case apy or compound is true, it'd be validate compoundFrequency
      if((this.vForm.controls.interestType.value == 'apy' || this.vForm.controls.compound.value) && !this.vForm.controls.compoundFrequency.value) {
        this.vForm.controls.compoundFrequency.setValidators(Validators.required);
        this.vForm.controls.compoundFrequency.setErrors({'incorrect': true})
      }else{
        this.vForm.controls.compoundFrequency.clearValidators();
      }

      //Temp for fix bug form rollback after use updateValueAndValidity
      let temp = this.vForm.getRawValue()
      for (const i in this.vForm.controls) {
        this.vForm.controls[i].markAsTouched()
        this.vForm.controls[i].updateValueAndValidity()
      }

      //Temp for fix bug form rollback after use updateValueAndValidity //Update form again
      this.vForm.setValue(temp)

      //copy price if same token
      const stakeToken = this.vForm.get('stakingToken').value
      const earnToken = this.vForm.get('earningToken').value
      if(stakeToken == earnToken) {
        this.vForm.get('earningTokenPrice').setValue(this.vForm.get('stakingTokenPrice').value)
      }

      if(this.vForm.invalid){
        this.message.create('error', `Required field(s) must not be empty.`)
        return
      }

      this.currentInfo = { ... this.vForm.getRawValue() }

      //Calculate section
      const stakingTime = this.currentInfo.stakingTime
      let mode
      if(this.currentInfo.interestType == 'apy'){
        let mode = 'auto-compound'
        const apy = this.currentInfo.interestRate //%
        const aprPerYear = this.apyToApr(apy)
        const aprPerDay = this.aprPerDay(aprPerYear)
        this.currentInfo['earnInfo.earnActual'] = this.calculateCompound(aprPerDay, stakingTime, this.currentInfo)
        this.currentInfo['earnInfo.earn1d'] = this.calculateCompound(aprPerDay, 1, this.currentInfo)
        this.currentInfo['earnInfo.earn7d'] = this.calculateCompound(aprPerDay, 7, this.currentInfo)
        this.currentInfo['earnInfo.earn30d'] = this.calculateCompound(aprPerDay, 30, this.currentInfo)
        this.currentInfo['earnInfo.earn1y'] = this.calculateCompound(aprPerDay, 365, this.currentInfo)
        console.log('mode', mode, 'apy', apy, 'aprPerDay', aprPerDay, 'currentInfo', this.currentInfo )
      }else{
        const apr = this.currentInfo.interestRate //%
        const aprPerDay = this.aprPerDay(apr)
        if(this.currentInfo.compound){
          let mode = 'manual-compound'
          this.currentInfo['earnInfo.earnActual'] = this.calculateCompound(aprPerDay, stakingTime, this.currentInfo)
          this.currentInfo['earnInfo.earn1d'] = this.calculateCompound(aprPerDay, 1, this.currentInfo)
          this.currentInfo['earnInfo.earn7d'] = this.calculateCompound(aprPerDay, 7, this.currentInfo)
          this.currentInfo['earnInfo.earn30d'] = this.calculateCompound(aprPerDay, 30, this.currentInfo)
          this.currentInfo['earnInfo.earn1y'] = this.calculateCompound(aprPerDay, 365, this.currentInfo)
        }else{
          let mode = 'manual'
          this.currentInfo['earnInfo.earnActual'] = this.calculateManual(aprPerDay, stakingTime, this.currentInfo)
          this.currentInfo['earnInfo.earn1d'] = this.calculateManual(aprPerDay, 1, this.currentInfo)
          this.currentInfo['earnInfo.earn7d'] = this.calculateManual(aprPerDay, 7, this.currentInfo)
          this.currentInfo['earnInfo.earn30d'] = this.calculateManual(aprPerDay, 30, this.currentInfo)
          this.currentInfo['earnInfo.earn1y'] = this.calculateManual(aprPerDay, 365, this.currentInfo)
        }
        console.log('mode', mode, 'apr', apr, 'aprPerDay', aprPerDay, 'currentInfo', this.currentInfo )
      }
      this.confirmModal.close()

    }catch(error) {
      console.error(error)
      this.message.create('error', `Calculate failure.`);
      this.currentInfo = { ... cleanCurrentInfo }
    }

  }

  handleSaveAndShare(): void {
    this.notification.create(
      'info',
      'Sorry, This feature not avalible',
      'Please see the roadmap <a href="https://taang.dev">taang.dev</a>'
    );
  }

  openDrawer() {
    this.screenControl.openMenu = true
  }

  closeDrawer() {
    this.screenControl.openMenu = false
  }

}
