<!-- 
  ***运行后请将localhost地址复制到飞书多维表格插件中，在浏览器中打开则会由于无法获得语言环境而无法正常显示***
 -->
<template>
  <div class = "center">
    <el-link href="https://dac57ho49r5.feishu.cn/docx/MG5KdjT5lo5fTOxLoNBcRIFTnYc" target="_blank">{{ $t('form.appCode') }}</el-link>
    <el-link href="https://bytedance.larkoffice.com/docx/WXtGdRmOioeH9VxlfCtc1Y41nKe" target="_blank">{{ $t('form.feishuDocument') }}</el-link>

    <el-input style="margin-top: 5px;" v-model="input" type="password" :placeholder="$t('form.enterAppcode')" show-password/>

    <el-popover placement="top-start" :title="$t(`form.content.unneccessary`)" :width="400" trigger="hover" :content="$t(`form.content.fpdmRemind`)">
      <template #reference>
        <el-text style="width: 100%;margin-top: 20px;" size="default">{{ $t('form.content.fpdmTitle') }}</el-text>
      </template>
    </el-popover>
    <el-select style="width: 100%;margin-top: 5px;" v-model="fpdmContent" :placeholder="$t(`form.content.pleaseSelect`)" size="large" :no-data-text="$t(`form.content.noField`)">
      <el-option v-for="item in fieldList" :key="item.id" :value="item.name" @click = "fpdmRenew(item)"/>
    </el-select>

    <el-popover placement="top-start" :title="$t(`form.content.neccessary`)" :width="400" trigger="hover" :content="$t(`form.content.fphmRemind`)">
      <template #reference>
        <el-text style="width: 100%;margin-top: 20px;" size="default">{{ $t('form.content.fphmTitle') }}</el-text>
      </template>
    </el-popover>
    <el-select style="width: 100%;margin-top: 5px;" v-model="fphmContent" :placeholder="$t(`form.content.pleaseSelect`)" size="large" :no-data-text="$t(`form.content.noField`)">
      <el-option v-for="item in fieldList" :key="item.id" :value="item.name" @click = "fphmRenew(item)" />
    </el-select>

    <el-popover placement="top-start" :title="$t(`form.content.unneccessary`)" :width="400" trigger="hover" :content="$t(`form.content.xymRemind`)">
      <template #reference>
        <el-text style="width: 100%;margin-top: 20px;" size="default">{{ $t('form.content.xymTitle') }}</el-text>
      </template>
    </el-popover>
    <el-select style="width: 100%;margin-top: 5px;" v-model="xymContent" :placeholder="$t(`form.content.pleaseSelect`)" size="large" :no-data-text="$t(`form.content.noField`)">
      <el-option v-for="item in fieldList" :key="item.id" :value="item.name" @click = "xymRenew(item)"/>
    </el-select>

    <el-popover placement="top-start" :title="$t(`form.content.neccessary`)" :width="400"  trigger="hover" :content="$t(`form.content.kprqRemind`)">
      <template #reference>
        <el-text style="width: 100%;margin-top: 20px;" size="default">{{ $t('form.content.kprqTitle') }}</el-text>
      </template>
    </el-popover>
    <el-select style="width: 100%;margin-top: 5px;" v-model="kprqContent" :placeholder="$t(`form.content.pleaseSelect`)" size="large" :no-data-text="$t(`form.content.noField`)">
      <el-option v-for="item in fieldList" :key="item.id" :value="item.name" @click = "kprqRenew(item)"/>
    </el-select>

    <el-popover placement="top-start" :title="$t(`form.content.unneccessary`)" :width="400" trigger="hover" :content="$t(`form.content.bhsjeRemind`)">
      <template #reference>
        <el-text style="width: 100%;margin-top: 20px;" size="default" >{{ $t('form.content.bhsjeTitle') }}</el-text>
      </template>
    </el-popover>
    <el-select style="width: 100%;margin-top: 5px;" v-model="bhsjeContent" :placeholder="$t(`form.content.pleaseSelect`)" size="large" :no-data-text="$t(`form.content.noField`)">
      <el-option v-for="item in fieldList" :key="item.id" :value="item.name" @click = "bhsjeRenew(item)"/>
    </el-select>

    <el-text style="width: 100%;margin-top: 20px;" size="default">{{ $t('form.content.yzTitle') }}</el-text>
    <el-select style="width: 100%;margin-top: 5px;" v-model="yzContent" :placeholder="$t(`form.content.pleaseSelect`)" size="large" :no-data-text="$t(`form.content.noField`)">
      <el-option v-for="item in fieldList" :key="item.id" :value="item.name" @click = "yzRenew(item)"/>
    </el-select>

    <el-text style="width: 100%;margin-top: 20px;" size="default">{{ $t('form.content.zfTitle') }}</el-text>
    <el-select style="width: 100%;margin-top: 5px;" v-model="zfContent" :placeholder="$t(`form.content.pleaseSelect`)" size="large" :no-data-text="$t(`form.content.noField`)">
      <el-option v-for="item in fieldList" :key="item.id" :value="item.name" @click = "zfRenew(item)"/>
    </el-select>

    <el-text style="width: 100%;margin-top: 20px;" size="default">{{ $t('form.content.chTitle') }}</el-text>
    <el-select style="width: 100%;margin-top: 5px;" v-model="chContent" :placeholder="$t(`form.content.pleaseSelect`)" size="large" :no-data-text="$t(`form.content.noField`)">
      <el-option v-for="item in fieldList" :key="item.id" :value="item.name" @click = "chRenew(item)"/>
    </el-select>

    <el-button type="success" :disabled = "able" @click="submitData" style="width: 100%;margin-top: 45px;">{{ $t('form.content.submit') }}</el-button>
  </div>
</template>


<script setup>
import { ref,onMounted,h } from 'vue';
import { bitable} from '@lark-base-open/js-sdk';
import  axios  from 'axios';
import { ElMessage,ElNotification, avatarEmits } from 'element-plus';
import { useI18n } from 'vue-i18n';
import useCurrentInstance from "./useCurrentInstance";

const  {proxy}  = useCurrentInstance();
const { t } = useI18n();
const locale = proxy.$message.global.locale
const selection = ref({})
const records = ref([])
const pageSize = 5000
let fieldList = []
let testList = []
let responseData = []
const fpdmContent = ref()
const fphmContent = ref()
const kprqContent = ref()
const xymContent = ref()
const bhsjeContent = ref()
const yzContent = ref()
const zfContent = ref()
const chContent = ref()
const input = ref()
const able = ref(false)
const codeFieldId = ref('')
const numFieldId = ref('')
const checkFieldId = ref('')
const sumFieldId = ref('')
const dateFieldId = ref('')
const yzFieldId = ref('')
const zfFieldId = ref('')
const chFieldId = ref('')

const fpdmRenew = (item)=>{
  fpdmContent.value = item.name
  codeFieldId.value = item.id
}

const fphmRenew = (item)=>{
  fphmContent.value = item.name
  numFieldId.value = item.id
}

const xymRenew = (item)=>{
  xymContent.value = item.name
  checkFieldId.value = item.id
}

const kprqRenew = (item)=>{
  kprqContent.value = item.name
  dateFieldId.value = item.id
}

const bhsjeRenew = (item)=>{
  bhsjeContent.value = item.name
  sumFieldId.value = item.id
}

const yzRenew = (item)=>{
  yzContent.value = item.name
  yzFieldId.value = item.id
}

const zfRenew = (item)=>{
  zfContent.value = item.name
  zfFieldId.value = item.id

}

const chRenew = (item)=>{
  chContent.value = item.name
  chFieldId.value = item.id
}

const successBox = (e) => {
  if(locale == 'zh'){
    ElMessage({
      message: '发票号码'+e+'核验正确',
      type: 'success',
    })
  }else{
    ElMessage({
      message: 'Invoice number'+e+'verified to be correct',
      type: 'success',
    })
  }
}

const warningBox = (e) => {
  if(locale == 'zh'){
    ElMessage({
      message: '有'+e+'张发票核验错误',
      type: 'warning',
    })
  }else{
    ElMessage({
      message: e+'invoice verification errors',
      type: 'warning',
    })
  }
}

const errorBox = (e) => {
  if(locale == 'zh'){
    ElMessage.error('有'+e.errorCount +'张发票获取数据失败('+e.message+')')
  }else{
    ElMessage.error(e.errorCount +'invoices failed to obtain data('+e.message+')')
  }
}

const formPrompt = () => {
  if(locale == 'zh'){
    ElNotification({
      title: '提示',
      message: h('i', { style: 'color: black' }, '请完整填写列表'),
    })
  }else{
    ElNotification({
      title: 'Prompt',
      message: h('i', { style: 'color: black' }, 'Please fill out the complete list'),
    })
  }
}

const codePrompt = () => {
  if(locale == 'zh'){
    ElNotification({
      title: '提示',
      message: h('i', { style: 'color: black' }, '请填写AppCode'),
   })
  }else{
    ElNotification({
      title: 'Prompt',
      message: h('i', { style: 'color: black' }, 'Please fill in AppCode'),
   })
  }
}

onMounted(async () => {
  selection.value = await bitable.base.getSelection();
  const table = await bitable.base.getTableById(selection.value.tableId)
  const view = await table.getViewById(selection.value.viewId);
  const fieldListId = await view.getVisibleFieldIdList()
  for (let element of fieldListId) {
    let fmeta = await table.getFieldMetaById(element)
    let newEle = {
      id:fmeta.id,
      name:fmeta.name
    }
    fieldList = fieldList.concat(newEle)
  }
  let hasMore = true
  let pageToken = ''
  let tempRecords = []
  while (hasMore) {
    const res = await table.getRecords({ pageToken, pageSize })
    hasMore = res.hasMore
    pageToken = res.pageToken
    tempRecords = tempRecords.concat(res.records)
  }
  records.value = tempRecords
})


const submitData = async () => {
  if(input.value == null){
    codePrompt()
  }else if(fpdmContent.value != null &&fphmContent.value != null && kprqContent.value != null && xymContent.value != null && bhsjeContent.value != null && yzContent.value != null && zfContent.value != null && chContent.value != null ){
    able.value = true
    const table = await bitable.base.getTableById(selection.value.tableId)
    const codeField = await table.getField(codeFieldId.value);
    const numField = await table.getField(numFieldId.value);
    const checkField = await table.getField(checkFieldId.value);
    const sumField = await table.getField(sumFieldId.value);
    const dateField = await table.getField(dateFieldId.value);
    for (let record of records.value) {
      let codeCell = await codeField.getCell(record.recordId);
      let codeRes = await codeCell.getValue();
      let codeVal = ''
      if(codeRes != null){
        codeVal = codeRes[0].text
      }
      let numCell = await numField.getCell(record.recordId);
      let numRes = await numCell.getValue();
      let numVal = ''
      if(numRes != null){
        numVal = numRes[0].text
      }
      let checkCell = await checkField.getCell(record.recordId);
      let checkRes = await checkCell.getValue();
      let checkVal = ''
      if(checkRes != null){
        checkVal = checkRes[0].text
      }
      let sumCell = await sumField.getCell(record.recordId);
      let sumRes = await sumCell.getValue();
      let sumVal = ''
      if (sumRes != null) {
        if (typeof sumRes == 'number') {
          sumVal = '' + sumRes
        }else{
          sumVal = sumRes[0].text.split('').filter(letter => !Number.isNaN(parseInt(letter)) || letter =='.').join('')
        }
      }
      let dateCell = await dateField.getCell(record.recordId);
      let dateRes = await dateCell.getValue();
      let dateVal = ''
      if(dateRes != null){
        if(typeof dateRes == 'number'){
          var date = new Date(dateRes);
          var Y = date.getFullYear();
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
          var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
          dateVal = ''+Y+M+D
        }else{
          dateVal = dateRes[0].text.split('').filter(letter => !Number.isNaN(parseInt(letter))).join('')
        }
      }
      let test = {
        recordId:record.recordId,
        codeVal:codeVal,
        numVal:numVal,
        checkVal:checkVal,
        sumVal:sumVal,
        dateVal:dateVal
      }
      testList = testList.concat(test)
    }
    responseData = await requestData()
    await writeRecord()
  }else{
    formPrompt()
  }
}

const requestData = async () => {
  let res = []
  let faultCount = 0
  let errorCount = 0
  for (let record of testList) {
    await axios({
      method:'post',
      url:'https://jminvoice.market.alicloudapi.com/invoice/validate',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 
        'Authorization': `APPCODE ${input.value}`, 
      },
      data : {
        fpdm:record.codeVal,
        fphm:record.numVal,
        kprq:record.dateVal,
        bhsje:record.sumVal,
        xym:record.checkVal
      }
    }).then((response) => {
      let message = ''
      let cancellationMark = ''
      let hcbz = ''
      if (response.data.data.message == '一致') {
        successBox(response.data.data.info.invoiceNo)
        if(locale == 'zh'){
          message = '一致'
        }else{
          message = 'Consistent'
        }
        if(response.data.data.info.cancellationMark == '0'){
          if(locale == 'zh'){
            cancellationMark = '未作废'
          }else{
            cancellationMark = 'Not Voided'
          }
        }else{
          if(locale == 'zh'){
            cancellationMark = '已作废'
          }else{
            cancellationMark = 'Voided'
          }
        }
        switch (response.data.data.info.hcbz) {
          case '0': 
            if(locale == 'zh'){
              hcbz = '未红冲'
            }else{
              hcbz = 'Unred Offset'
            }
          break;
          case '1': 
            if(locale == 'zh'){
              hcbz = '全额红冲'
            }else{
              hcbz = 'Full Red Offset'
            }
          break;
          case '2': 
            if(locale == 'zh'){
              hcbz = '部分红冲'
            }else{
              hcbz = 'Partial Red Offset'
            }
          break;
        }
      }else if(response.data.data.message == '不一致'){
          faultCount++
          warningBox(faultCount)
          if(locale == 'zh'){
              message = '不一致'
            }else{
              message = 'Inconsistent'
            }
      }
      let sRe={
        recordId:record.recordId,
        message:message,
        cancellationMark:cancellationMark,
        hcbz:hcbz
      }
      res = res.concat(sRe)
    }).catch((err) => {
      errorCount++
      let message = ''
      switch (err.message.split('').filter(letter => !Number.isNaN(parseInt(letter))).join('')) {
        case '203': 
          if(locale == 'zh'){
            message = '超过该张票当天查验次数，税局规定的每张发票一天只能调用5次'
          }else{
            message = 'If the number of inspections on the same day exceeds the limit, the tax bureau stipulates that each invoice can only be called 5 times a day'
          }
        break;
        case '204': 
          if(locale == 'zh'){
            message = '查验发票张数超过限制查验发票张数超过限制'
          }else{
            message = 'The number of verified invoices exceeds the limit'
          }
        break;
        case '205': 
          if(locale == 'zh'){
            message = '超过五年的发票不能查验，请核对开票日期是否正确'
          }else{
            message = 'Invoices over five years cannot be verified. Please verify if the invoicing date is correct'
          }
        break;
        case '206': 
          if(locale == 'zh'){
            message = '当前发票正在查验中,请稍后重试'
          }else{
            message = 'The current invoice is being verified, please try again later'
          }
        break;
        case '207': 
          if(locale == 'zh'){
            message = '该地区暂不支持该票种查验'
          }else{
            message = 'The region currently does not support verification of this ticket type'
          }
        break;
        case '400': 
          if(locale == 'zh'){
            message = '参数错误'
          }else{
            message = 'Parameter error'
          }
        break;
        case '411': 
          if(locale == 'zh'){
            message = '查询发票不规范, 请核对参数是否符合发票规范'
          }else{
            message = 'The invoice query is not standardized. Please verify if the parameters meet the invoice specifications'
          }
        break;
        case '412': 
          if(locale == 'zh'){
            message = '开票日期超过当前日期，请核对开票日期是否正确'
          }else{
            message = 'The invoicing date exceeds the current date. Please verify if the invoicing date is correct'
          }
        break;
        case '500': 
          if(locale == 'zh'){
            message = '服务商维护，请稍候再试'
          }else{
            message = 'Service provider maintenance, please try again later'
          }
        break;
        case '502':
          if(locale == 'zh'){
            message = '网络故障，请稍候再试'
          }else{
            message = 'Network malfunction, please try again later'
          } 
        break;     
      }
      errorBox({message,errorCount})
      res = res.concat({
        recordId:record.recordId,
        message:message
      })
    })
  }
  return res
}

const writeRecord = async () => {
  const table = await bitable.base.getTableById(selection.value.tableId)
  for (let record of responseData) {
    table.setCellValue(yzFieldId.value, record.recordId, record.message)
    table.setCellValue(zfFieldId.value, record.recordId, record.cancellationMark)
    table.setCellValue(chFieldId.value, record.recordId, record.hcbz)
  }
}
</script>


<style scoped>
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;;
}
</style>
