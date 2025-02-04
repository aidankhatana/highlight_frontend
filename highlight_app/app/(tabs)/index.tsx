import React from "react";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  Easing 
} from "react-native-reanimated";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width, height } = Dimensions.get("window");

interface AnimatedCircleProps {
  size: number;
  x: number;
  y: number;
  delay: number;
}

const AnimatedCircle: React.FC<AnimatedCircleProps> = ({ size, x, y, delay }) => {
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    setTimeout(() => {
      opacity.value = withRepeat(
        withTiming(1, { duration: 2000, easing: Easing.ease }),
        -1,
        true
      );
    }, delay);
  }, [delay, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          left: x,
          top: y,
        },
        animatedStyle,
      ]}
    />
  );
};

export default function LandingPage() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const circles = [
    { size: 100, x: width * 0.1, y: height * 0.1, delay: 0 },
    { size: 150, x: width * 0.5, y: height * 0.3, delay: 500 },
    { size: 80, x: width * 0.8, y: height * 0.6, delay: 1000 },
    { size: 120, x: width * 0.2, y: height * 0.7, delay: 1500 },
  ];

  return (
    <ThemedView style={styles.container}>
      {circles.map((circle, index) => (
        <AnimatedCircle key={index} {...circle} />
      ))}
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Welcome to Highlight
        </ThemedText>
        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>Login</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.registerButton]}>
          <ThemedText style={styles.buttonText}>Register</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  circle: {
    position: "absolute",
    backgroundColor: "rgba(100, 200, 255, 0.2)",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: 200,
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: "#34C759",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

