getwd()
setwd("C:/Users/Leon Trieu/Documents/School/CMPT 318")
getwd()
options(max.print=1000000)
df = read.table("test.txt", header = TRUE, sep = ",")
test <- df

#format(test$Date, format="%d/%m/%Y")

test$newTime=chron(times=test$Time)
test$newDate=as.Date(test$Date, format="%d/%m/%Y")

#format(test$Time, format="%H:%M:%S")

test$year<-format(as.Date(test$Date, format="%d/%m/%Y"),"%Y")
#test$whatmonth<-format(as.Date(test$Date, format="%d/%m/%Y"),"%m")
test$whatday <- weekdays(as.Date(test$newDate))


#typeof(test$year)
#print(test$year)
#test$ntimes = 240

play1<-(
  test %>%
    select(Global_active_power,Date,Time,year,newTime,newDate,whatday) %>%
    filter(whatday == "Monday") %>%
#    filter(year == "2007" | year== "2008") %>%
    filter(newTime >= chron(times="12:00:00") & newTime <= chron(times="19:59:00")))
   # filter(whatmonth == "05" | whatmonth == "06" | whatmonth == "07" | whatmonth == "08" | whatmonth == "09" | whatmonth == "10")
  
#splitDate<-format(as.Date("31/07/2008", format="%d/%m/%Y"))
#play1train<-subset(play1,newDate<=splitDate)
#play1validate<-subset(play1,newDate>splitDate)

write.table(play1,"textMondays.txt",sep=",",row.names=FALSE)
#write.table(play1validate,"play1validate.txt",sep=",",row.names=FALSE)


nTimesTrain<-0
nRowsTrain =nrow(play1train)
trainNumPtsPerDay<-480
for(i in 1:(nRowsTrain/trainNumPtsPerDay)){
  nTimesTrain[i] <- trainNumPtsPerDay
}


nTimesValidate<-0
nRowsValidate = nrow(play1validate)
for(i in 1:(nRowsValidate/trainNumPtsPerDay)){
  nTimesValidate[i] <- trainNumPtsPerDay
}


library("depmixS4")
numStates <-8
set.seed(1)
mod1 <- depmix(response = Global_active_power ~ 1, data = play1train ,nstates =numStates, ntimes = nTimesTrain)
fm1<- fit(mod1)
summary(fm1)
print(fm1)

mod_val <-depmix(response=Global_active_power ~ 1, data = play1validate, nstates=numStates, ntimes = nTimesValidate)
mod_val<-setpars(mod_val,getpars(fm1))

fb<-forwardbackward(mod_val)

print(fm1)
print(fb$logLik)
BIC(mod_val)
