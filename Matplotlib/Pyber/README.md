# Pyber Ride Sharing #

## Analysis ##
As the total number of rides increases in the city type, the average fare decreases. The more rides there are, the lower the fares are.

Urban citites have the largest numbers of rides and the lowest averages for fares. The inverse can be seen in rural citites. Rural cities have the smallest number of rides and drivers, but the average fare is much higher.

Rural citites have the largest difference between the highest paid fare and the lowest paid fare with an almost $30 difference.

```python
import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import matplotlib.patches as mpatches
from matplotlib.collections import PatchCollection
```


```python
# import data/create city data df
city_data = os.path.join("city_data.csv")
city_data_df = pd.read_csv(city_data, encoding = "ISO-8859-1")
city_data_df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>city</th>
      <th>driver_count</th>
      <th>type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Kelseyland</td>
      <td>63</td>
      <td>Urban</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Nguyenbury</td>
      <td>8</td>
      <td>Urban</td>
    </tr>
    <tr>
      <th>2</th>
      <td>East Douglas</td>
      <td>12</td>
      <td>Urban</td>
    </tr>
    <tr>
      <th>3</th>
      <td>West Dawnfurt</td>
      <td>34</td>
      <td>Urban</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Rodriguezburgh</td>
      <td>52</td>
      <td>Urban</td>
    </tr>
  </tbody>
</table>
</div>




```python
# import data/create ride data df
ride_data = os.path.join("ride_data.csv")
ride_data_df = pd.read_csv(ride_data, encoding = "ISO-8859-1")
ride_data_df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>city</th>
      <th>date</th>
      <th>fare</th>
      <th>ride_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Sarabury</td>
      <td>2016-01-16 13:49:27</td>
      <td>38.35</td>
      <td>5403689035038</td>
    </tr>
    <tr>
      <th>1</th>
      <td>South Roy</td>
      <td>2016-01-02 18:42:34</td>
      <td>17.49</td>
      <td>4036272335942</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Wiseborough</td>
      <td>2016-01-21 17:35:29</td>
      <td>44.18</td>
      <td>3645042422587</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Spencertown</td>
      <td>2016-07-31 14:53:22</td>
      <td>6.87</td>
      <td>2242596575892</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Nguyenbury</td>
      <td>2016-07-09 04:42:44</td>
      <td>6.28</td>
      <td>1543057793673</td>
    </tr>
  </tbody>
</table>
</div>




```python
# total number of fares
tot_fare_city = ride_data_df.groupby("city")
tot_city_fare = tot_fare_city["fare"].sum()
tot_city_fare

# convert series to dataframe
total_city_fare_df = tot_city_fare.to_frame()
total_fare = total_city_fare_df.reset_index()
total_fare = total_fare.rename(columns={"fare":"Total Amount of Fares"})
total_fare.head()

```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>city</th>
      <th>Total Amount of Fares</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Alvarezhaven</td>
      <td>741.79</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Alyssaberg</td>
      <td>535.85</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Anitamouth</td>
      <td>335.84</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Antoniomouth</td>
      <td>519.75</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Aprilchester</td>
      <td>417.65</td>
    </tr>
  </tbody>
</table>
</div>




```python
# avg fare by city
fare_city = ride_data_df.groupby("city")
ride_city_fare = fare_city.agg({"fare" : np.mean})
fare = ride_city_fare.reset_index()
fare.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>city</th>
      <th>fare</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Alvarezhaven</td>
      <td>23.928710</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Alyssaberg</td>
      <td>20.609615</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Anitamouth</td>
      <td>37.315556</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Antoniomouth</td>
      <td>23.625000</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Aprilchester</td>
      <td>21.981579</td>
    </tr>
  </tbody>
</table>
</div>




```python
# number of rides per city
number_rides = ride_data_df.groupby("city")
number_rides_city = number_rides["ride_id"].nunique()

# convert series to dataframe
number_rides_df = number_rides_city.to_frame()
number = number_rides_df.reset_index()
number.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>city</th>
      <th>ride_id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Alvarezhaven</td>
      <td>31</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Alyssaberg</td>
      <td>26</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Anitamouth</td>
      <td>9</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Antoniomouth</td>
      <td>22</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Aprilchester</td>
      <td>19</td>
    </tr>
  </tbody>
</table>
</div>




```python
# merge avg fare and number rides
combined_ride_data = pd.merge(fare, number,
                                 how='outer', on='city')

total_combined_ride_data = pd.merge(combined_ride_data, total_fare,
                                 how='outer', on='city')

total_combined_ride_data.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>city</th>
      <th>fare</th>
      <th>ride_id</th>
      <th>Total Amount of Fares</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Alvarezhaven</td>
      <td>23.928710</td>
      <td>31</td>
      <td>741.79</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Alyssaberg</td>
      <td>20.609615</td>
      <td>26</td>
      <td>535.85</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Anitamouth</td>
      <td>37.315556</td>
      <td>9</td>
      <td>335.84</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Antoniomouth</td>
      <td>23.625000</td>
      <td>22</td>
      <td>519.75</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Aprilchester</td>
      <td>21.981579</td>
      <td>19</td>
      <td>417.65</td>
    </tr>
  </tbody>
</table>
</div>




```python
# merge ride data and city data and rename columns
combined_data = pd.merge(total_combined_ride_data, city_data_df,
                                 how='outer', on='city')

combined_data = combined_data.rename(columns={"ride_id":"Total Number of Rides", "fare":"Average Fare", 
                                              "driver_count": "Driver Count", "type":"City Types", "city":"City"})
combined_data.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>City</th>
      <th>Average Fare</th>
      <th>Total Number of Rides</th>
      <th>Total Amount of Fares</th>
      <th>Driver Count</th>
      <th>City Types</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Alvarezhaven</td>
      <td>23.928710</td>
      <td>31</td>
      <td>741.79</td>
      <td>21</td>
      <td>Urban</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Alyssaberg</td>
      <td>20.609615</td>
      <td>26</td>
      <td>535.85</td>
      <td>67</td>
      <td>Urban</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Anitamouth</td>
      <td>37.315556</td>
      <td>9</td>
      <td>335.84</td>
      <td>16</td>
      <td>Suburban</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Antoniomouth</td>
      <td>23.625000</td>
      <td>22</td>
      <td>519.75</td>
      <td>21</td>
      <td>Urban</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Aprilchester</td>
      <td>21.981579</td>
      <td>19</td>
      <td>417.65</td>
      <td>49</td>
      <td>Urban</td>
    </tr>
  </tbody>
</table>
</div>



## Bubble Plot of Ride Sharing Data ##
```python
# create bubble plot

# set types of bubbles
_type = ['Urban', 'Suburban', 'Rural']

# assign color to city type
pal = dict(Urban="coral", Suburban="lightskyblue", Rural="gold")

df = combined_data

# create bubble plot
fg = sns.FacetGrid(data=df, hue='City Types', hue_order=_type, aspect=1.61, palette=pal, size=4)
fg.map(plt.scatter, 'Total Number of Rides', 'Average Fare', s=combined_data["Driver Count"]*5, 
       edgecolors="black", alpha=0.75).add_legend()

plt.title("Pyber Ride Sharing Data")
plt.ylabel("Average Fare ($)")
plt.xlabel("Total Number of Rides (Per City)")
plt.text(40,45,"Note: Circle size correlates with driver count per city.")


plt.show()
```


![png](output_8_0.png)


## Total Fares by City Type ##
```python
# % of Total Fares by City Type

# groupby city type and count number of fares for each
pct_fares = combined_data.groupby("City Types")
fares_count = pct_fares["Total Amount of Fares"].sum()
fares_count

# labels for sections of pie chart
labels = ["Rural", "Suburban", "Urban"]

# values of each section of the pie chart
sizes = fares_count

# colors of each section of the pie chart
colors = ["gold", "lightskyblue", "coral"]

# Tells matplotlib to seperate the "Python" section from the others
explode = (0, 0, 0.1)

plt.pie(sizes, labels=labels, colors=colors, autopct="%1.1f%%", shadow=True, startangle=140, explode=explode)

plt.axis("equal")
plt.title("% of Total Fares by City Type")

plt.show()

```


![png](output_9_0.png)


## Total Rides by City Type ##
```python
#% of Total Rides by City Type

pct_rides = combined_data.groupby("City Types")
tot_ride_count = pct_rides["Total Number of Rides"].sum()
tot_ride_count

# Labels for the sections of our pie chart
labels = ["Rural", "Suburban", "Urban"]

# The values of each section of the pie chart
sizes = tot_ride_count

# The colors of each section of the pie chart
colors = ["gold", "lightskyblue", "coral"]

# Tells matplotlib to seperate the "Python" section from the others
explode = (0, 0, 0.1)

plt.pie(sizes, labels=labels, colors=colors, autopct="%1.1f%%", shadow=True, startangle=140, explode=explode)

plt.axis("equal")
plt.title("% of Total Rides by City Type")

plt.show()

```


![png](output_10_0.png)


## Total Drivers by City Type ##
```python
#% of Total Drivers by City Type
pct_driver = combined_data.groupby("City Types")
tot_driver_count = pct_driver["Driver Count"].sum()
tot_driver_count

# Labels for the sections of our pie chart
labels = ["Rural", "Suburban", "Urban"]

# The values of each section of the pie chart
sizes = tot_ride_count

# The colors of each section of the pie chart
colors = ["gold", "lightskyblue", "coral"]

# Tells matplotlib to seperate the "Python" section from the others
explode = (0, 0, 0.1)

plt.pie(sizes, labels=labels, colors=colors, autopct="%1.1f%%", shadow=True, startangle=140, explode=explode)

plt.axis("equal")
plt.title("% of Total Drivers by City Type")

plt.show()
```


![png](output_11_0.png)

