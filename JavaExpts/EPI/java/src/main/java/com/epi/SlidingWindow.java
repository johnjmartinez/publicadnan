package com.epi;

import com.epi.QueueWithMaxUsingDeque.Queue;

import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class SlidingWindow {
  // @include
  public static class TrafficElement implements Comparable<TrafficElement> {
    public int time;
    public double volume;

    public TrafficElement(int time, double volume) {
      this.time = time;
      this.volume = volume;
    }

    @Override
    public int compareTo(TrafficElement o) {
      int volumeCmp = Double.compare(volume, o.volume);
      return  volumeCmp != 0 ? volumeCmp : time - o.time;
    }

    @Override
    public boolean equals(Object o) {
      if (this == o) {
        return true;
      }
      if (o == null || getClass() != o.getClass()) {
        return false;
      }
      return compareTo((TrafficElement)o) == 0;
    }

    @Override
    public int hashCode() {
      return new HashCodeBuilder(23, 109)
          .append(volume)
          .append(time)
          .toHashCode();
    }
  }

  public static List<TrafficElement> computeTrafficVolumes(TrafficElement[] A,
                                                           int w) {
    Queue<TrafficElement> slidingWindow = new Queue<>();
    List<TrafficElement> maximumVolumes = new ArrayList<>();
    for (TrafficElement trafficInfo : A) {
      slidingWindow.enqueue(trafficInfo);
      while (trafficInfo.time - slidingWindow.head().time > w) {
        slidingWindow.dequeue();
      }
      maximumVolumes.add(
          new TrafficElement(trafficInfo.time, slidingWindow.max().volume));
    }
    return maximumVolumes;
  }
  // @exclude

  public static void main(String[] args) {
    int w = 3;
    TrafficElement[] A = new TrafficElement[] {
        new TrafficElement(0, 1.3), new TrafficElement(2, 2.5),
        new TrafficElement(3, 3.7), new TrafficElement(5, 1.4),
        new TrafficElement(6, 2.6), new TrafficElement(8, 2.2),
        new TrafficElement(9, 1.7), new TrafficElement(14, 1.1)};
    List<TrafficElement> result = computeTrafficVolumes(A, w);
    List<TrafficElement> golden =
        Arrays.asList(new TrafficElement(0, 1.3), new TrafficElement(2, 2.5),
                      new TrafficElement(3, 3.7), new TrafficElement(5, 3.7),
                      new TrafficElement(6, 3.7), new TrafficElement(8, 2.6),
                      new TrafficElement(9, 2.6), new TrafficElement(14, 1.1));
    assert result.equals(golden);
  }
}
