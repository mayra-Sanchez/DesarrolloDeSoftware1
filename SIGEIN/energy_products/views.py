import csv
from django.http import HttpResponse
from rest_framework import generics, permissions, serializers
from users.permissions import IsAdminPermission, IsManagerPermission, IsOwnerPermission, IsClientPermission
from employees.permissions import IsEmployeePermission
from clients.models import Clients
from .models import ElectricityPrice, EnergyConsumptions
from .serializers import ElectricityPriceSerializer, EnergyConsumptionSerializer
from .filters import ElectricityPriceFilter, EnergyConsumptionFilter


# Create your views here.

class ListAllElectricityPricesView(generics.ListAPIView):
    serializer_class = ElectricityPriceSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser | IsEmployeePermission]
    queryset = ElectricityPrice.objects.all()


class SearchElectricityPriceView(generics.ListAPIView):
    serializer_class = ElectricityPriceSerializer
    filter_class = ElectricityPriceFilter
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser | IsEmployeePermission]
    queryset = ElectricityPrice.objects.all()

    def validate_url_params(self):
        remove_list = []        

        for param in self.request.query_params:
            if param not in self.filter_class.Meta.fields:
                remove_list.append(param)     

        output = (True, remove_list) if len(remove_list)==0 else (False, remove_list)
        return output


    def get_queryset(self):
        queryset = super().get_queryset()
        validate_params = self.validate_url_params()

        if(not validate_params[0]):                        
            if( len(self.request.query_params) == len(validate_params[1]) ):
                return queryset.none()

        if(len(self.request.query_params)>0):
            # The qs attribute of the filter instance contains the filtered queryset.
            queryset = self.filter_class(self.request.query_params, queryset=queryset).qs
        else:            
            queryset = queryset.none()            
        
        return queryset


class ListAllEnergyConsumptionsView(generics.ListAPIView):
    serializer_class = EnergyConsumptionSerializer
    #permission_classes = [permissions.AllowAny]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser | IsEmployeePermission]
    queryset = EnergyConsumptions.objects.all()


class SearchEnergyConsumptionsView(generics.ListAPIView):
    serializer_class = EnergyConsumptionSerializer
    filter_class = EnergyConsumptionFilter
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser | IsEmployeePermission]
    queryset = EnergyConsumptions.objects.all()

    def validate_url_params(self):
        remove_list = [] 
        filter_fields =  self.filter_class.Meta.fields.copy() + [self.filter_class.extra_fields]

        for param in self.request.query_params:
            if param not in filter_fields:
                remove_list.append(param)     

        output = (True, remove_list) if len(remove_list)==0 else (False, remove_list)
        return output

    def get_queryset(self):
        queryset = super().get_queryset()
        validate_params = self.validate_url_params()

        if(not validate_params[0]):                        
            if( len(self.request.query_params) == len(validate_params[1]) ):
                return queryset.none()

        if(len(self.request.query_params)>0):
            # The qs attribute of the filter instance contains the filtered queryset.
            queryset = self.filter_class(self.request.query_params, queryset=queryset).qs
        # else:            
        #     queryset = queryset.none() 
            
        return queryset



class EnergyConsumptionsCsvReportView(generics.ListAPIView):
    filter_class = EnergyConsumptionFilter
    #permission_classes = [permissions.AllowAny]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser | IsAdminPermission | IsManagerPermission]
    queryset = EnergyConsumptions.objects.all()


    def validate_url_params(self):
        remove_list = [] 
        filter_fields =  self.filter_class.Meta.fields.copy() + [self.filter_class.extra_fields]

        for param in self.request.query_params:
            if param not in filter_fields:
                remove_list.append(param)     

        output = (True, remove_list) if len(remove_list)==0 else (False, remove_list)
        return output

    def get_queryset(self):
        queryset = super().get_queryset()
        validate_params = self.validate_url_params()

        if(not validate_params[0]):                        
            if( len(self.request.query_params) == len(validate_params[1]) ):
                return queryset.none()

        if(len(self.request.query_params)>0):
            # The qs attribute of the filter instance contains the filtered queryset.
            queryset = self.filter_class(self.request.query_params, queryset=queryset).qs

        return queryset


    def list(self, request, *args, **kwargs):

        queryset = self.get_queryset()
        file_name = "energy_consumptions.csv"

        serializer = EnergyConsumptionSerializer(queryset, many=True)

        # Create a HttpResponse with the appropriate CSV header
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="{file_name}"'

        # Create a CSV writer
        writer = csv.writer(response, delimiter=';')
        # Write the header row
        csv_header = list(serializer.data[0].keys())
        writer.writerow(csv_header)

        # write the data
        for index, consumption in enumerate(serializer.data):
            csv_data = []
            for key, value in consumption.items():
                if key=='price_kwh':
                    price = queryset[index].price_kwh.price
                    csv_data.append(price)
                else:
                    csv_data.append(value)

            writer.writerow(csv_data)


        return response


        #return super().list(request, *args, **kwargs)
       

