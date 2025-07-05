'use client'

import { useDispatch, useSelector } from 'react-redux'
import { Animated, View, Text, StyleSheet, Touchable } from 'react-bits'
import { addScore, buyWorker, RootState } from '@/lib/store'
import { useInterval } from '@/hooks/use-interval'

export default function GamePage() {
  const dispatch = useDispatch()
  const { score, level, threshold, workers, workerCost } = useSelector(
    (state: RootState) => state.game,
  )

  useInterval(() => dispatch(addScore(workers)), 1000)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Civilization Clicker</Text>
      <Touchable onPress={() => dispatch(addScore(1))} style={styles.button}>
        <Animated.View style={styles.inner}>
          <Text style={styles.buttonText}>Gather</Text>
        </Animated.View>
      </Touchable>
      <Touchable
        onPress={() => dispatch(buyWorker())}
        style={[styles.button, score < workerCost && styles.disabled]}
        disabled={score < workerCost}
      >
        <Animated.View style={styles.inner}>
          <Text style={styles.buttonText}>Hire Worker ({workerCost})</Text>
        </Animated.View>
      </Touchable>
      <Text style={styles.info}>Score: {score}</Text>
      <Text style={styles.info}>Workers: {workers}</Text>
      <Text style={styles.info}>Level: {level}</Text>
      <Text style={styles.info}>Next level at: {threshold}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: '#444',
    padding: 10,
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  inner: {
    padding: 10,
    backgroundColor: '#eee',
  },
  buttonText: {
    fontSize: 18,
  },
  info: {
    fontSize: 16,
  },
})
